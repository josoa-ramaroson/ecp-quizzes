import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Ready for a Quest? Let\'s Go!!!!';
  }
}
