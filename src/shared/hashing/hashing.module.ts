import { Module } from '@nestjs/common';
import { BCryptHashingService } from './bcrypt-hashing.service';
import { C_HASHING_SERVICE } from 'src/common';

@Module({
  providers: [{ provide: C_HASHING_SERVICE, useClass: BCryptHashingService }],
  exports: [C_HASHING_SERVICE],
})
export class HashingModule {}
