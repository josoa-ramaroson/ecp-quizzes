import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import * as Joi from 'joi';

import { MembersModule } from './modules/members/members.module';
import { QuestionsModule } from './modules/questions/questions.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { IEnvirenmentVariables } from './common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_PIPE } from '@nestjs/core';
import { HashingModule } from './hashing/hashing.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object<IEnvirenmentVariables>({   
        MONGODB_URI: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
      }),
    }), 
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI"),
        dbName: configService.get<string>("DATABASE_NAME"),
      }),
      inject: [ConfigService],
    }),
    MembersModule, 
    QuestionsModule, HashingModule, 
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
