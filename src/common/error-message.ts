import { HttpStatus } from '@nestjs/common';

export interface IErrorMessages {
  type: string;
  httpStatus: HttpStatus;
  errorMessage: string;
  userMessage: string;
}

export const errorMessagesConfig: { [messageCode: string]: IErrorMessages } = {
  'file:id:notfound': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'File not found',
    userMessage: 'File not found'
  },
  'file:status:notCorrect': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'File is not allow to change status',
    userMessage: 'File is not allow to change status'
  },
  'signing:id:notfound': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Signing id not found',
    userMessage: 'Signing id not found'
  }
};
