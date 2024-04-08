import {  IsNotEmpty, IsNumber, IsOptional, IsString, ValidationOptions, registerDecorator, ValidationArguments } from "class-validator";

export class CreateAppointmentDTO {
    
    @IsDateString({
        message: 'Invalid date format. Please use YYYY-MM-DD'
    })
    @IsNotEmpty()
    date: string;
    
    @IsTimeString({
        message: 'Invalid time format. Please use HH:mm:ss'
    })
    @IsNotEmpty()
    time?: string;

    @IsNumber()
    @IsOptional()
    duration?: number;

    @IsNumber()
    @IsOptional()
    numberOfSlots?: number;

}

export class CreateAppointmentDTOWithUserId extends CreateAppointmentDTO {
    @IsNotEmpty()
    userId: string;
}

export function IsDateString(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'IsDateString',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
          },
        },
      });
    };
  }

export function IsTimeString(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'IsTimeString',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            return typeof value === 'string' && /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(value);
          },
        },
      });
    };
  }