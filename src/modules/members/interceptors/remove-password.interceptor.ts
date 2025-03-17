import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMember } from 'src/common';

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: IMember[] | IMember) => {
        if (data) {
          if (Array.isArray(data)) {
            return data.map((item: IMember) => {
              return {
                _id: item._id,
                pseudo: item.pseudo,
                firstName: item.firstName,
                facebookName: item.facebookName,
                role: item.role,
              };
            });
          } else if (typeof data == 'object') {
            return {
              _id: data._id,
              pseudo: data.pseudo,
              firstName: data.firstName,
              facebookName: data.facebookName,
              role: data.role,
            };
          }
        }
      }),
    );
  }
}
