import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

export const fileSchemaName = 'files';

@Schema({
  timestamps: true
})
export class File {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  createdBy: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
