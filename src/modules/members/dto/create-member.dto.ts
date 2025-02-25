import { IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { EMemberRole } from "src/common";

export class CreateMemberDto {
    @IsString()
    @MaxLength(255)
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    readonly firstName: string;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    readonly facebookName: string;

    @IsEnum(EMemberRole)
    @IsNotEmpty()
    readonly role: EMemberRole;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}