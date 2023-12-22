import { Type } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsNumber,
  IsString,
  IsBoolean,
} from 'class-validator';

export class HouseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  occupancy: string;

  @IsNotEmpty()
  @IsString()
  bathRoom: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  bedRoom: string;

  @IsNotEmpty()
  @IsNumberString()
  diningRoom: string;

  @IsNotEmpty()
  @IsString()
  kitchen: string;

  @IsNotEmpty()
  @IsString()
  livingRoom: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  hall: string;

  @IsNotEmpty()
  @IsString()
  area: string;

  @IsNotEmpty()
  @IsString()
  yearBuilt: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsNotEmpty()
  @IsString()
  listingDate: string;

  @IsNotEmpty()
  @IsString()
  closingDate: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsOptional()
  @IsString()
  feature: string;

  @IsOptional()
  @IsString()
  facilities: string;

  @IsOptional()
  facilitiesArray: Array<string>;

  @IsOptional()
  booked: boolean;

  @IsNotEmpty()
  @IsEnum(Type, {
    each: true,
    message() {
      return (
        'Provided value is invalid. Valid values are' +
        Object.values(Type).map((e) => e)
      );
    },
  })
  type: Type;
}
