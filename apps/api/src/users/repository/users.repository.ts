import { Injectable } from "@nestjs/common";
import DatabaseService from "@server/database/database.service";

@Injectable()
class UsersRepository {
  constructor(private readonly databaseService: DatabaseService) {}
}

export default UsersRepository;
