import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import UsersRepository from "./repository/users.repository";
import UserDto from "./dto/user.dto";
import { hashAText } from "@server/common/utils/utils";

@Injectable()
class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUsers(page: number = 0, limit: number = 10) {
    try {
      const users = await this.usersRepository.getAllUser(page, limit);
      const totalRows = await this.usersRepository.getTotalRows();
      return { totalRows, users };
    } catch (error) {
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserById(id: number) {
    return this.usersRepository.getUserById(id);
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.getUserByEmail(email);
  }

  async addUser(userData: UserDto) {
    try {
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
    } catch (error) {
      if (error?.status == HttpStatus.CONFLICT) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(userData: UserDto) {
    return this.usersRepository.create(userData);
  }

  async updateUser(id: number, userData: UserDto) {
    try {
      const targetUser = await this.getUserById(id);
      if (!targetUser) {
        throw new NotFoundException();
      }

      if (targetUser.email !== userData.email) {
        const emailExist = await this.getUserByEmail(userData.email);
        if (emailExist) {
          throw new HttpException("Email already in use.", HttpStatus.CONFLICT);
        }
      }

      const hashedPassword = await hashAText(userData.password);
      return this.usersRepository.update(id, {
        ...userData,
        password: hashedPassword,
      });
    } catch (error) {
      if (error?.status == HttpStatus.CONFLICT) {
        throw new HttpException(error.message, error.status);
      }
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(id: number) {
    try {
      return this.usersRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export default UsersService;
