import { Injectable } from "@nestjs/common";
import UsersRepository from "./repository/users.repository";

@Injectable()
class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
}

export default UsersService;
