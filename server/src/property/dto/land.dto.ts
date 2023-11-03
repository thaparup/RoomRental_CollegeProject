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

export class LandDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  // @IsOptional()
  // @IsArray()
  // image: string[];

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  cost: string;

  @IsNotEmpty()
  @IsString()
  area: string;

  @IsNotEmpty()
  @IsString()
  nameOfRoad: string;

  @IsNotEmpty()
  @IsString()
  distanceFromRoad: string;

  // @IsNotEmpty()
  // @IsString()
  facilities: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  // @IsArray()
  // @IsDate()
  reservations: string[];

  @IsNotEmpty()
  @IsEnum(Type, {
    each: true,
    message() {
      return (
        'Provided value is invalid. Valid values are ' +
        Object.values(Type).map((e) => e)
      );
    },
  })
  type: Type;

  @IsNotEmpty()
  @IsEnum(FACEDON, {
    each: true,
    message() {
      return (
        'Provided value is invalid. Valid values are ' +
        Object.values(FACEDON).map((e) => e)
      );
    },
  })
  facedOn: FACEDON;
}
