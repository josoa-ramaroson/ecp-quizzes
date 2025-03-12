import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { EErrorMessage } from 'src/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: string | number, metadata: ArgumentMetadata): Date {
    const date = new Date(value);

    if (isNaN(date.getTime()))
      throw new BadRequestException(EErrorMessage.INVALID_DATE_FORMAT);

    return date;
  }
}
