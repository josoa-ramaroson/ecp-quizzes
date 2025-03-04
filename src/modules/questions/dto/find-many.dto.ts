import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class FindManyDto {
    @IsString({each: true})
    @IsNotEmpty()
    @IsMongoId({each: true})
    questionsIds: string[];
}