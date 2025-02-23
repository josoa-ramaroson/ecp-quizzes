import { Injectable } from '@nestjs/common';
import { IQuestion } from 'src/common';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionsService {
    
    private readonly questions: IQuestion[] = [] ;

    async findAll() {
        return "find All";
    }

    async findOne(id: string): Promise<IQuestion> {
        return this.questions.filter((value) => value.id == id)[0]
    }

    async create(question: CreateQuestionDto) {
        this.questions.push({id: new Date().toISOString(), ...question});
    }

    async update(question: UpdateQuestionDto) {
        console.log("update");
    }

    async delete(id: string) {
        console.log("delete");
    }
}
