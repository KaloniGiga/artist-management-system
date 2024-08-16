import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { AuthenticationService } from "../auth.service";
import UserModel from "@server/users/model/user.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthenticationService) {
    super({
      usernameField: "email",
    });
  }

  async validate(email: string, password: string): Promise<UserModel> {
    return this.authService.validateUser(email, password);
  }
}
