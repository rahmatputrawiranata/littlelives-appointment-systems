import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/user/user.schema";

@Schema()
export class Appointment {
    @Prop({ required: true, type: Types.ObjectId, ref: User.name})
    userId: Types.ObjectId;

    @Prop({ required: true })
    startDateTime: Date;

    @Prop({ required: true })
    endDateTime: Date;

    @Prop({ required: true })
    status: string;
}

export type AppointmentDocument = Appointment & Document;
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);