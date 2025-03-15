import {  IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateMemberProfileDto {

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    pseudo: string;

    @IsString()
    @IsNotEmpty()
    facebookName: string;

    @IsString()
    @IsOptional()
    password: string;
}