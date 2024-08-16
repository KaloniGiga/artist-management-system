import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import UsersService from "./users.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResponseMessage } from "@server/common/decorators/response-message.decorator";
import UserDto from "./dto/user.dto";

@ApiTags("Users")
@Controller({ version: "1", path: "users" })
class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: "Get users",
    description: "Get user with pagination",
  })
  @ResponseMessage("Users fetched successfully")
  async getUsers(
    @Query("page", ParseIntPipe) page: number,
    @Query("limit", ParseIntPipe) limit: number,
  ) {
    return await this.usersService.getAllUsers(page, limit);
  }

  @Post()
  @ApiOperation({
    summary: "create user",
    description:
      "create user with first_name, last_name, email, phone, password, dob, gender role_type etc.",
  })
  @ResponseMessage("User created successsfully.")
  createUser(@Body() userData: UserDto) {
    return this.usersService.createUser(userData);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update user",
    description: "update user whose id is provided",
  })
  @ResponseMessage("User updated successsfully.")
  updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() userData: Omit<UserDto, "password">,
  ) {
    return this.usersService.updateUser(id, userData);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete user",
    description: "delete user whose id is provided.",
  })
  @ResponseMessage("User deleted successsfully.")
  deleteUser(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}

export default UsersController;
