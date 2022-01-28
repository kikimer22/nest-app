import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from "../users/user.entity";
import { AuthUserDto } from "./dto/auth-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(authUserDto: AuthUserDto) {
    const payload = { username: authUserDto.username, sub: authUserDto.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
