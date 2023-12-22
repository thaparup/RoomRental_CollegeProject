import { ApiProperty } from '@nestjs/swagger/dist';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class PasswordResetDTO {
  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  current_password: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
export class ResetPasswordDTO {
  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
export class UpdatePasswordDTO {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
