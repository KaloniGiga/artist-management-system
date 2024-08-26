import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { RoleEnum } from "../types/types";
import { ApiProperty } from "@nestjs/swagger";
import { GenderEnum } from "@server/common/types/types";
import { Type } from "class-transformer";

class UserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  dob: Date;

  @ApiProperty()
  @IsEnum(GenderEnum)
  @IsNotEmpty()
  gender: GenderEnum;

  @ApiProperty()
  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role_type: RoleEnum;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  artistId?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;
}

export default UserDto;
