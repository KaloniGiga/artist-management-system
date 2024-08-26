import { OmitType } from "@nestjs/swagger";
import UserDto from "@server/users/dto/user.dto";

export default class RegisterUserDto extends OmitType(UserDto, [
  "artistId",
] as const) {}

// export default RegisterUserDto;
