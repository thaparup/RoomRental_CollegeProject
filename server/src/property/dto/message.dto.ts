import { Type } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';
import { FACEDON } from '@prisma/client';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
