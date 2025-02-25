import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { CreateQuestionDto } from "../dto/create-question.dto";
import { isSubArray } from "src/utils";
import { UpdateQuestionDto } from "../dto/update-question.dto";
import { EErrorMessage } from "src/common";

@Injectable()
export class QuestionValidationPipe implements PipeTransform {
    transform(value: CreateQuestionDto | UpdateQuestionDto, metadata: ArgumentMetadata) {
        const anwsersOptions = value.answersOptions!;
        const correctAnswers = value.correctAnswers!;
        if ( !isSubArray<string>(anwsersOptions, correctAnswers)) {
            throw new BadRequestException(EErrorMessage.CORRECT_ANSWERS_NOT_IN_ANSWERS_OPTIONS)
        }

        return value;
    }
}