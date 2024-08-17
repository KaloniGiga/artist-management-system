import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { GenreEnum } from "../types/types";
import { ApiProperty } from "@nestjs/swagger";

class SongDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  album_name: string;

  @ApiProperty()
  @IsEnum(GenreEnum)
  @IsNotEmpty()
  genre: GenreEnum;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}

export default SongDto;
