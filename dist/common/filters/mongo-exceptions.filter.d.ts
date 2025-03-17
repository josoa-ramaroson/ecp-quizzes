import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { MongooseError } from 'mongoose';
export declare class MongoExceptionsFilter implements ExceptionFilter {
    catch(exception: MongooseError, host: ArgumentsHost): void;
}
