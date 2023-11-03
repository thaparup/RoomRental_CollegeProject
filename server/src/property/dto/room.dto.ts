import { Type, RoomType } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class RoomDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()

  // @Min(0, { message: 'Number must be greater than or equal to 0' })
  // @Max(10, { message: 'Number must be less than or equal to 100' })
  occupancy: string;

  @IsNotEmpty()
  bathRoom: string;
  @IsNotEmpty()
  cost: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  size: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  feature: string;

  @IsOptional()
  @IsString()
  facilities: string;

  @IsOptional()
  facilitiesArray: Array<string>;

  @IsOptional()
  termsAndConditions: string;

  @IsOptional()
  accepted: boolean;

  @IsOptional()
  latitude: Array<string>;
  @IsOptional()
  myLat: string;

  @IsOptional()
  myLong: string;

  @IsOptional()
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

  @IsOptional()
  @IsEnum(RoomType, {
    each: true,
    message() {
      return (
        'Provided value is invalid. Valid values are ' +
        Object.values(RoomType).map((e) => e)
      );
    },
  })
  roomtype: RoomType;
}
