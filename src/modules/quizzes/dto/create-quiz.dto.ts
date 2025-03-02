import { IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateQuizDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    readonly title: string;

    @IsString()
    @IsOptional()
    @MaxLength(1500)
    readonly description: string;

    @IsDateString()
    @IsNotEmpty()
    readonly date: Date;

    @IsDateString()
    @IsNotEmpty()
    readonly deadline: Date;
}