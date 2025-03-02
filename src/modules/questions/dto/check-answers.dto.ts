import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CheckAnswersDto {
    @IsArray()
    @IsNotEmpty({ message: "Answers cannot be empty" })
    @IsString({ each: true, message: "Each answer must be a string" })
    answers: string[];

    @IsString()
    @IsNotEmpty()
    memberId: string;
}