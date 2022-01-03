import { Controller, Get } from '@nestjs/common';

export interface User {
  email: string;
  type: string;
}

@Controller('users')
export class UsersController {
  @Get()
  getUsers(): User[] {
    return [
      {
        email: 'kikimer22@gmail.com',
        type: 'admin',
      },
    ];
  }
}
