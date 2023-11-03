import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  text: string;

  @IsOptional()
  commenterName: string;

  @IsOptional()
  commenterProfileImage: string;
}
