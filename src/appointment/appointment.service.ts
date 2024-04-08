import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './appointment.schema';
import { AppointmentDTO, QueryAvailaibleAppointmentDTO } from './dto/appointment.dto';
import { Model } from 'mongoose';
import { CreateAppointmentDTOWithUserId } from './dto/createAppointment.dto';
import { Config } from './config.schema';
import * as dayjs from 'dayjs'

@Injectable()
export class AppointmentService {

    constructor(
        @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
        @InjectModel(Config.name) private configModel: Model<Config>
    ) {}

    async get(query: QueryAvailaibleAppointmentDTO): Promise<AppointmentDTO[]> {
        const startOfDay = new Date(`${query.date}T00:00:00Z`)

        const endOfDay = new Date(`${query.date}T23:59:59Z`)
        const res = await this.appointmentModel.find({
            startDateTime: { $gte: startOfDay, $lt: endOfDay },
            status: 'active'
        })

        return res.map(appointment => ({
            id: appointment._id.toString(),
            startDateTime: appointment.startDateTime,
            endDateTime: appointment.endDateTime,
            userId: appointment.userId.toString(),
            status: appointment.status
        }))
    }

    async create(appointment: CreateAppointmentDTOWithUserId ): Promise<AppointmentDTO> {
        
        const config = await this.configModel.findOne({})

        // max duration of appointment is 30 minutes
        const startDate = new Date(`${appointment.date}T${appointment.time}Z`)
        const duration = appointment.duration || config.defaultSlotDuration
        const slot = appointment.numberOfSlots || 1
        const endDate = dayjs(startDate).add(duration * slot, 'minute').toDate()
        // check if the appointment is within the working hours
        
        if(startDate < new Date()) {
            throw new HttpException('Appointments cannot be scheduled for the past. Please choose a future date and time.', HttpStatus.BAD_REQUEST)
        }
        if(!this.isWithinWorkingHours(startDate, endDate, config)) throw new HttpException('Appointment cannot be scheduled within break times', HttpStatus.BAD_REQUEST)
        

        if(appointment?.duration < config.minimumSlotDuration) {
            throw new HttpException(`Minimum slot duration is ${config.minimumSlotDuration} minutes`, HttpStatus.BAD_REQUEST)
        }

        if(appointment.numberOfSlots > config.maxNumOfSlot) {
            throw new HttpException(`Maximum number of slots is ${config.maxNumOfSlot}`, HttpStatus.BAD_REQUEST)
        }

        

        // check if appointment already exists
        const appointmentExists = await this.appointmentModel.findOne({
            "$or" : [
                {
                    "$and": [
                        { startDateTime: { $gte: startDate } },
                        { startDateTime: { $lt: endDate } }
                    ]
                },
                {
                    "$and": [
                        { endDateTime: { $gt: startDate } },
                        { endDateTime: { $lte: endDate } }
                    ]
                }
            ],
            status: 'active'
        })

        if (appointmentExists) {
            throw new HttpException('Appointment already exists', HttpStatus.BAD_REQUEST)
        }
        
        const newAppointment = new this.appointmentModel({
            userId: appointment.userId,
            startDateTime: startDate,
            endDateTime: endDate,
            status: 'active'
        })

        return {
            id: newAppointment._id.toString(),
            userId: newAppointment.userId.toString(),
            startDateTime: newAppointment.startDateTime,
            endDateTime: newAppointment.endDateTime,
            status: newAppointment.status
        }
    }

    private isWithinWorkingHours(startDate: Date, endDate: Date, config: Config): boolean {
        const day = dayjs(startDate).format('dddd').toLowerCase()

        const isNotInBreakTimes = config.workingDays.find(workingDay => workingDay.day.toLowerCase() === day).breaks.some(breakTime => {
            const breakStartTime = new Date(`${dayjs(startDate).format('YYYY-MM-DD')}T${breakTime.start}:00Z`);
            const breakEndTime = new Date(`${dayjs(endDate).format('YYYY-MM-DD')}T${breakTime.end}:00Z`);
            if(startDate >= breakStartTime && startDate < breakEndTime) {
                return false
            }else if(endDate >= breakStartTime && endDate <= breakEndTime) {
                return false
            }else{
                return true
            }
        })

        return isNotInBreakTimes
    }
}
