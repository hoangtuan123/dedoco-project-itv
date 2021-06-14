import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { SigningStatus } from './signing.enum';

export type SigningDocument = Signing & mongoose.Document;

export const signingSchemaName = 'signings';

@Schema({
  timestamps: true
})
export class Signing {
  @Prop({ required: true })
  fileRawId: string;

  @Prop()
  fileSignedId: string;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ required: true })
  signer: string;

  @Prop({ default: SigningStatus.Created })
  status: SigningStatus;

  @Prop()
  tagSignatureLocation: string;
}

export const SigningSchema = SchemaFactory.createForClass(Signing);
