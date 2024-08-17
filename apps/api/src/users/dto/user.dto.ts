import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";
import { GenderEnum, RoleEnum } from "../types/types";
import { ApiProperty } from "@nestjs/swagger";

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
  role: RoleEnum;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;
}

export default UserDto;
