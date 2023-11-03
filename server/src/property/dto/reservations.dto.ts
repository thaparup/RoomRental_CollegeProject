import { Type } from '@prisma/client';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { FACEDON } from '@prisma/client';

export class ReservationDto {
  reservations: string[];

  @IsOptional()
  text: string;
}
