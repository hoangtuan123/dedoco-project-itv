import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SigningDocumentCreationValidator {
  @IsEmail()
  @ApiProperty()
  createdBy: string;

  @IsEmail()
  @ApiProperty()
  signer: string;

  @ApiProperty()
  tagSignatureLocation: string;

  @ApiProperty({
    type: 'string',
    format: 'binary'
  })
  file: any;
}
