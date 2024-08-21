import { Body, Req, Controller, Post, UseGuards, Get } from "@nestjs/common";
import { AuthenticationService } from "./auth.service";
import RegisterUserDto from "./dto/register-user.dto";
import { LocalAuthenticationGuard } from "./guards/local.guard";
import { RequestWithUser } from "./types/types";
import JwtAuthenticationGuard from "./guards/jwt.guard";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import LoginUserDto from "./dto/login-user.dto";

@ApiTags("Authentication")
@Controller({ version: "1", path: "auth" })
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post("register")
  async register(@Body() registrationData: RegisterUserDto) {
    return await this.authenticationService.register(registrationData);
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post("log-in")
  @ApiBody({ type: LoginUserDto })
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
