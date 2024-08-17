import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { GenreEnum } from "../types/types";

class SongDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  album_name: string;

  @IsEnum(GenreEnum)
  @IsNotEmpty()
  genre: GenreEnum;
}

export default SongDto;
