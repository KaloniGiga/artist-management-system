import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import UsersService from "@server/users/users.service";
import RegisterUserDto from "./dto/register-user.dto";
import { TokenPayload } from "./types/types";
import { RoleEnum } from "@server/users/types/types";
import { compareHashAndText, hashAText } from "@server/common/utils/utils";
import { plainToInstance } from "class-transformer";
import UserModel from "@server/users/model/user.model";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(registrationData: RegisterUserDto) {
    try {
      const emailExists = await this.usersService.getUserByEmail(
        registrationData.email,
      );
      if (emailExists) {
        throw new HttpException("Email already used.", HttpStatus.CONFLICT);
      }

      if (registrationData.role_type !== RoleEnum.SUPERADMIN) {
        throw new HttpException(
          "Only super admin can register.",
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = await this.hashPassword(registrationData.password);
      const createdUser = await this.usersService.createUser({
        ...registrationData,
        password: hashedPassword,
      });
      return createdUser;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  public async validateUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getUserByEmail(email);
      if (!user) {
        throw new HttpException(
          "Wrong credentials provided",
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.verifyPassword(plainTextPassword, user.password);

      return plainToInstance(UserModel, user);
    } catch (error) {
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await compareHashAndText(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtAccessToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_ACCESS_TOKEN_SECRET"),
      expiresIn: `${this.configService.get("JWT_ACCESS_TOKEN_EXPIRATION_TIME")}s`,
    });
    return `accessToken=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${this.configService.get("JWT_ACCESS_TOKEN_EXPIRATION_TIME")}s`;
  }

  public getCookiesForLogOut() {
    return ["accessToken=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0"];
  }

  private async hashPassword(plainTextPassword: string) {
    return await hashAText(plainTextPassword);
  }
}
