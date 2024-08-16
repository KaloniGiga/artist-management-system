import { Body, Req, Controller, Post, UseGuards, Get } from "@nestjs/common";
import { AuthenticationService } from "./auth.service";
import UsersService from "@server/users/users.service";
import RegisterUserDto from "./dto/register-user.dto";
import { LocalAuthenticationGuard } from "./guards/local.guard";
import { RequestWithUser } from "./types/types";
import JwtAuthenticationGuard from "./guards/jwt.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller({ version: "1", path: "authentication" })
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  @Post("register")
  async register(@Body() registrationData: RegisterUserDto) {
    return await this.authenticationService.register(registrationData);
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post("log-in")
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessTokenCookie =
      this.authenticationService.getCookieWithJwtAccessToken(user.id);

    request.res?.setHeader("Set-Cookie", [accessTokenCookie]);
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post("log-out")
  async logOut(@Req() request: RequestWithUser) {
    request.res?.setHeader(
      "Set-Cookie",
      this.authenticationService.getCookiesForLogOut(),
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }
}
