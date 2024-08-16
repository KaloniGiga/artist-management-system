import { Controller } from "@nestjs/common";
import UsersService from "./users.service";

@Controller({ version: "1", path: "users" })
class UsersController {
  constructor(private readonly usersService: UsersService) {}
}

export default UsersController;
