import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './modules/questions/questions.module';
import { MembersModule } from './modules/members/members.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    QuestionsModule, 
    MembersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
