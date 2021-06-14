import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException
} from '@nestjs/common';
import { MessageCodeError } from './message-code-error';

@Catch(MessageCodeError, HttpException, Error)
export class DispatchError implements ExceptionFilter {
  public catch(err: any, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    Logger.log(err);
    if (err instanceof MessageCodeError) {
      /* MessageCodeError, Set all header variable to have a context for the client in case of MessageCodeError. */
      res.header('x-message-code-error', err.messageCode);
      res.header('x-message', err.message);
      res.header('x-httpStatus-error', err.httpStatus);

      res.header('Content-Type', 'application/json');

      return res.status(HttpStatus.BAD_REQUEST).send(err);
    } else if (err instanceof UnauthorizedException) {
      /* Unauthorized error. */
      res.header('x-message-code-error', (err as any).status);
      res.header('x-message', (err as any).message);
      res.header('x-httpStatus-error', HttpStatus.UNAUTHORIZED);
      res.header('Content-Type', 'application/json');

      return res.status(HttpStatus.UNAUTHORIZED).send(err.message);
    } else if (err instanceof ForbiddenException) {
      res.header('x-message', (err as any).message);
      res.header('Content-Type', 'application/json');
      return res.status(HttpStatus.FORBIDDEN).send(err.message);
    } else if (err instanceof BadRequestException) {
      const invalidInfo = err.message;
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ ...err, message: 'Data invalid', invalidInfo });
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }
}
