import { Body, Req, Controller, Post, UseGuards, Get } from "@nestjs/common";
import { AuthenticationService } from "./auth.service";
import RegisterUserDto from "./dto/register-user.dto";
import { LocalAuthenticationGuard } from "./guards/local.guard";
import { RequestWithUser } from "./types/types";
import JwtAuthenticationGuard from "./guards/jwt.guard";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import LoginUserDto from "./dto/login-user.dto";
import { ResponseMessage } from "@server/common/decorators/response-message.decorator";

@ApiTags("Authentication")
@Controller({ version: "1", path: "auth" })
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post("register")
  @ApiOperation({
    summary: "Register user",
    description: "User registration have role super_admin",
  })
  @ResponseMessage("user registered successfully")
  async register(@Body() registrationData: RegisterUserDto) {
    return await this.authenticationService.register(registrationData);
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post("log-in")
  @ApiOperation({
    summary: "Login",
    description: "Login user with email and password",
  })
  @ResponseMessage("User logged in successfully")
  @ApiBody({ type: LoginUserDto })
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    console.log("user logged in.");
    const accessTokenCookie =
      this.authenticationService.getCookieWithJwtAccessToken(user.id);

    request.res?.setHeader("Set-Cookie", [accessTokenCookie]);
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @ApiOperation({
    summary: "Logout",
    description: "Logout a user",
  })
  @ResponseMessage("User logged out successfully")
  @Post("log-out")
  async logOut(@Req() request: RequestWithUser) {
    request.res?.setHeader(
      "Set-Cookie",
      this.authenticationService.getCookiesForLogOut(),
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @ApiOperation({
    summary: "Fetch user detail.",
    description: "Get a authenticated user.",
  })
  @ResponseMessage("User fetched successfully")
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }
}
