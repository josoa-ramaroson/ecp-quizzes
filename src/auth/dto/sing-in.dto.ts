import { IsString, IsNotEmpty, IsAlphanumeric, IsEmail } from "class-validator";

export class SignInDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}