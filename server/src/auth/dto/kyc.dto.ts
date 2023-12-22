import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsEnum,
  IsOptional,
  IsDate,
  IsDateString,
} from 'class-validator';
import { GENDER, PROVINCE } from '@prisma/client';

export class KycDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  occupation: string;

  @IsNotEmpty()
  @IsString()
  dob: string;

  @IsNotEmpty()
  @IsString()
  fatherName_husbandName: string;

  @IsNotEmpty()
  @IsString()
  panNumber: string;

  @IsNotEmpty()
  @IsString()
  grandFather_fatherInLaw: string;

  @IsNotEmpty()
  @IsString()
  spouseName: string;

  @IsString()
  landlineNumber: string;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  @IsString()
  mobileNumber: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  permanentAddress: string;

  @IsNotEmpty()
  @IsString()
  temporaryAddress: string;

  @IsNotEmpty()
  @IsEnum(PROVINCE, {
    each: true,
    message() {
      return (
        'Provided value is invalid. Valid values are' +
        Object.values(PROVINCE).map((e) => e)
      );
    },
  })
  province: PROVINCE;

  @IsNotEmpty()
  @IsEnum(GENDER, {
    each: true,
    message() {
      return (
        'Provided value is invalid. Valid values are' +
        Object.values(GENDER).map((e) => e)
      );
    },
  })
  gender: GENDER;
}

export class DeleteBackImageDto {
  profileImage: string;
}
