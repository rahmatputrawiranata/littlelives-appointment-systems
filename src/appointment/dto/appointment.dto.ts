import { IsNotEmpty } from "class-validator";
import { IsDateString } from "./createAppointment.dto";

export class AppointmentDTO {
    id: string;
    startDateTime: Date;
    endDateTime: Date;
    status: string;
    userId: string;
}

export class QueryAvailaibleAppointmentDTO {
    @IsDateString({
        message: 'Invalid date format. Please use YYYY-MM-DD'
    })
    @IsNotEmpty()
    date: string;
}