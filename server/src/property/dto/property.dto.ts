import { Type } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PropertyDto{

    @IsString()
    @IsNotEmpty()
    name : string;

    @IsOptional() //first ma rakhne
    @IsString()
    image : string;

    @IsString()
    @IsNotEmpty()
    location : string;

    @IsString()
    @IsNotEmpty()
    price : string;

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
    type : Type;


 }