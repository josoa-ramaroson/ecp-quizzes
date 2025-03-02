import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Error, MongooseError } from 'mongoose';
import { EErrorMessage } from '../enums';

@Catch(Error.CastError)
export class MongoExceptionsFilter implements ExceptionFilter {
  catch(exception: MongooseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = 400;
    response.status(status).json({
      statusCode: status,
      error: 'Bad Request',
      message: EErrorMessage.INVALID_RESSOURCE_REFERENCE,
    });
  }
}
