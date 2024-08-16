import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

class PaginationQueryDto {
  @ApiProperty({ example: 0 })
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @IsNotEmpty()
  limit: number;
}

export default PaginationQueryDto;
