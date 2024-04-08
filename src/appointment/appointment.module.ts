import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment, AppointmentSchema } from './appointment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentController } from './appointment.controller';
import { Config, ConfigSchema } from './config.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema }]),
    MongooseModule.forFeature([{ name: Config.name, schema: ConfigSchema }])
  ],
  providers: [AppointmentService],
  controllers: [AppointmentController]
})
export class AppointmentModule {}
