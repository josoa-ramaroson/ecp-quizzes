import { IsArray, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CheckAnswersDto {
    @IsArray()
    @IsNotEmpty()
    @IsString({ each: true })
    answers: string[];
    
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    memberId: string;

    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    quizId: string;
}