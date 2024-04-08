import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Config {
  @Prop({ required: true, type: [{}] })
  workingDays: {
    day: string;
    start: string;
    end: string;
    breaks: {
      start: string;
      end: string;
    }[];
  }[];

  @Prop({ required: true, type: [Date] })
  holidays: Date[];

  @Prop({ required: true, type: [{}] })
  urgentBreaks: {
    start: string;
    end: string;
    date: Date;
    reason: string;
  }[];

  @Prop({ required: true, type: Number })
  maxNumOfSlot: number;

  @Prop({ required: true, type: Number })
  defaultSlotDuration: number;

  @Prop({ required: true, type: Number })
  minimumSlotDuration: number;
}

export type ConfigDocument = Config & Document;
export const ConfigSchema = SchemaFactory.createForClass(Config);