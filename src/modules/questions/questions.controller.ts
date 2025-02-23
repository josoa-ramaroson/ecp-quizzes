import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionsController {
    
    constructor(private questionService: QuestionsService) {}

    @Get()
    async findAll(){
        return this.questionService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.questionService.findOne(id);
    }
    
    @Post()
    async createOne(@Body() createQuestionDto: CreateQuestionDto) {
        return this.questionService.create(createQuestionDto);
    }
    
    @Put()
    async updateOne(@Body() updateQuestionDto: UpdateQuestionDto) {
        return this.updateOne(updateQuestionDto);
    }

    @Delete(":id")
    async deleteOne(@Param("id") id: string) {
        return this.deleteOne(id);
    }
}
