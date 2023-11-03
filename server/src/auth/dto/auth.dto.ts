import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { PROVINCE } from '@prisma/client';

export class AuthSignUpDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  // @IsString()
  profileImage: string;
}
export class AuthSignInDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
