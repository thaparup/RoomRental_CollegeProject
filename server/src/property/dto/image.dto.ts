import { IsArray, IsString } from 'class-validator';

export class ImageDto {
  @IsArray()
  @IsString()
  image: String[];

  @IsArray()
  @IsString()
  name: String[];
}
