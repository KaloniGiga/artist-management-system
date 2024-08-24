import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import UsersRepository from "./repository/users.repository";
import UserDto from "./dto/user.dto";
import { hashAText } from "@server/common/utils/utils";

@Injectable()
class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUsers(page: number = 0, limit: number = 20) {
    try {
      return await this.usersRepository.getAllUser(page, limit);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async getUserById(id: number) {
    try {
      return this.usersRepository.getUserById(id);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async getUserByEmail(email: string) {
    try {
      return this.usersRepository.getUserByEmail(email);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async addUser(userData: UserDto) {
    const emailExists = await this.getUserByEmail(userData.email);
    if (emailExists) {
      throw new HttpException("Email already used.", HttpStatus.CONFLICT);
    }

    const hashedPassword = await hashAText(userData.password);

    const createdUser = await this.createUser({
      ...userData,
      password: hashedPassword,
    });
    return createdUser;
  }

  async createUser(userData: UserDto) {
    try {
      return this.usersRepository.create(userData);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateUser(id: number, userData: Omit<UserDto, "password">) {
    try {
      return this.usersRepository.update(id, userData);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async deleteUser(id: number) {
    try {
      return this.usersRepository.delete(id);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
}

export default UsersService;
