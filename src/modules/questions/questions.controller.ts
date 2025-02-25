import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionValidationPipe } from './pipes/question-validation.pipe';

@Controller('questions')
export class QuestionsController {
    
    constructor(private questionService: QuestionsService) {}

    @Post()
    @UsePipes(QuestionValidationPipe)
    async createOne(@Body() createQuestionDto: CreateQuestionDto) {
        return this.questionService.create(createQuestionDto);
    }

    @Get()
    async findAll(){
        return this.questionService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.questionService.findOne(id);
    }
    
    @Put(":id")
    async updateOne(@Param("id") id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
        return this.questionService.updateOne(id, updateQuestionDto);
    }

    @Delete(":id")
    async deleteOne(@Param("id") id: string) {
        return this.questionService.deleteOne(id);
    }
}
