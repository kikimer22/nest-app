import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {

  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":uid")
  findOne(@Param("uid") uid: string): Promise<User | undefined> {
    return this.usersService.findByUid(uid);
  }

  // @Delete(":uid")
  // async remove(@Param("uid") uid: string): Promise<void> {
  //   const user: User = await this.usersService.findByUid(uid);
  //   return this.usersService.remove(user.id);
  // }
}
