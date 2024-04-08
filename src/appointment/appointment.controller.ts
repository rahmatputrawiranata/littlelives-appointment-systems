import { Body, Controller, Get, HttpStatus, Post, Query, Request } from '@nestjs/common';
import { HttpResponseInterface } from 'src/@interceptors/http-transformer.interceptor';
import { AppointmentDTO, QueryAvailaibleAppointmentDTO } from './dto/appointment.dto';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDTO } from './dto/createAppointment.dto';

@Controller('appointment')
export class AppointmentController {

    constructor(private appointmentService: AppointmentService) {}
    
    @Get('avalaible')
    async getAppointments(@Query() query: QueryAvailaibleAppointmentDTO): Promise<HttpResponseInterface<AppointmentDTO[]>> {
        
        const response = await this.appointmentService.get(query);
        
        return {
            status: true,
            statusCode: HttpStatus.OK,
            response: response
        };
    }

    @Post()
    async createAppointment(@Body() data: CreateAppointmentDTO, @Request() request): Promise<HttpResponseInterface<AppointmentDTO>> {

        const user = request.user as {id: string};

        const response = await this.appointmentService.create({
            ...data,
            userId: user.id
        })

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            response: response
        };
    }

}
