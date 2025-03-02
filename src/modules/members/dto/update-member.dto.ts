import { PartialType } from "@nestjs/mapped-types";
import { CreateMemberDto } from "./create-member.dto";
import { IsNumber, IsOptional } from "class-validator";

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
    @IsNumber()
    readonly totalScore: number;
}