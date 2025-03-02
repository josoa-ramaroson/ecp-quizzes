import { ArgumentMetadata, BadRequestException, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { EErrorMessage, IQuestion } from "src/common";
import { Question } from "src/modules/questions";
import { AddOneQuestionDto } from "../dto";
import { verifyObjectId } from "src/utils";

@Injectable()
export class VerifyOneQuestionIdPipe implements PipeTransform {
    constructor(@InjectModel(Question.name) private readonly questionModel: Model<IQuestion>) {}

    async transform(value: AddOneQuestionDto, metadata: ArgumentMetadata): Promise<AddOneQuestionDto> {
        // # 1 : verify the existance of questionId
        if (!value?.questionId) 
            throw new BadRequestException(EErrorMessage.MISSING_QUESTION_ID_ERROR)!;
        // # 2 verify the data types
        if (typeof value?.questionId !== "string")
            throw new BadRequestException(EErrorMessage.INVALID_QUESTION_ID_ERROR);

        // #3 verify if we can convert it into objectId
        const questionId = value.questionId;
        if (!verifyObjectId(questionId))
            throw new BadRequestException(EErrorMessage.INVALID_QUESTION_ID_ERROR);
        
        // #4 verify if it's not in databases
        const existingQuestion = await this.questionModel.findById(questionId);
        if (!existingQuestion) 
            throw new NotFoundException(EErrorMessage.QUESTION_NOT_FOUND);

        return {questionId};
    }
}
