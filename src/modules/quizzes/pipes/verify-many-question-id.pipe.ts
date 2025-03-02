import { 
    ArgumentMetadata, 
    BadRequestException, 
    Injectable, 
    NotFoundException, 
    PipeTransform 
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EErrorMessage, IQuestion } from "src/common";
import { Question } from "src/modules/questions";
import { AddManyQuestionDto } from "../dto";
import { verifyObjectId } from "src/utils";

@Injectable()
export class VerifyManyQuestionIdPipe implements PipeTransform {
    constructor(@InjectModel(Question.name) private readonly questionModel: Model<IQuestion>) {}

    async transform(value: AddManyQuestionDto, metadata: ArgumentMetadata): Promise<AddManyQuestionDto> {
        // #1 verify the du body exists
        if (!value?.questionIds) 
            throw new BadRequestException(EErrorMessage.MISSING_QUESTION_IDS_ERROR);
        
        // #2 verify the data types
        const questionIds = value?.questionIds;
        if (!Array.isArray(questionIds)) 
            throw new BadRequestException(EErrorMessage.QUESTION_IDS_IN_BAD_FORMAT);
        
        // #3 verify if we can convert all of the questionIds is string and convertible into objectId
        if (questionIds.some(id => (typeof id !== "string" && verifyObjectId(id)))) 
            throw new BadRequestException(EErrorMessage.INVALID_QUESTION_IDS_ERROR);
        
        // #4 verify that every questionId exists in database
        // Fetch all requested questions in a single query
        const existingQuestions = await this.questionModel.find({ _id: { $in: questionIds } });
        if (existingQuestions.length !== questionIds.length) {
            // Identify missing question IDs
            const existingIds = new Set(existingQuestions.map(q => q.id));
            const missingIds = questionIds.filter(id => !existingIds.has(id));

            throw new NotFoundException(
                `${EErrorMessage.QUESTION_NOT_FOUND}: ${missingIds.join(", ")}`
            );
        }

        // #5 Map the results efficiently without extra queries
        return { questionIds };
    }
}
