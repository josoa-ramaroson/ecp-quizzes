import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './schemas/member.schema';
import { HashingModule } from 'src/hashing/hashing.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
    HashingModule
  ],
  controllers: [MembersController],
  providers: [
    MembersService,
  ],
})

export class MembersModule {}
