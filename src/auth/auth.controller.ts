import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { AuthUserDto } from "./dto/auth-user.dto";

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findByUsername(createUserDto.username);
    const authUserDto: AuthUserDto = {id: user.id, username: user.username};
    return this.authService.login(authUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
