import { ApiProperty } from "@nestjs/swagger";
import { GenderEnum } from "@server/common/types/types";
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from "class-validator";

class ArtistDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  dob: Date;

  @ApiProperty()
  @IsEnum(GenderEnum)
  @IsNotEmpty()
  gender: GenderEnum;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNumber()
  @Min(1900)
  @Max(2025)
  @IsNotEmpty()
  first_release_year: number;

  @IsNumber()
  @IsNotEmpty()
  no_of_albums_released: number;
}

export default ArtistDto;
