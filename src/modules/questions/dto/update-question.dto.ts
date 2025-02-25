import { PartialType } from "@nestjs/mapped-types";
import { CreateQuestionDto } from "./create-question.dto";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
}