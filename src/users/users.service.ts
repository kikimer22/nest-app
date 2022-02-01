import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import * as CONSTANT from "../constants.api";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, uid } = createUserDto;
    const noUnique1 = await this.findByUid(uid);
    if (!!noUnique1) {
      throw new Error("uid (" + uid + ") already exist").message;
    }
    const noUnique2 = await this.findByEmail(email);
    if (!!noUnique2) {
      console.log(noUnique2);
      this.remove(noUnique2.id);
    }
    const user = new User();
    user.email = email;
    user.uid = uid;
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    // return await this.usersRepository.find();
    const users: User[] = await this.usersRepository.find();
    if (users === undefined) {
      return [];
    }
    return users;
  }

  async findOne(id: string): Promise<User> {
    // return await this.usersRepository.findOne(id);
    const user: User = await this.usersRepository.findOne(id);
    if (user === undefined) {
      return null;
    }
    return user;
  }

  async findByUid(uid: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({ uid });
    if (user === undefined) {
      return null;
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({ email });
    if (user === undefined) {
      return null;
    }
    return user;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  public clearToken(authToken: string): string {
    const match = authToken.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
      throw new UnauthorizedException(CONSTANT.INVALID_BEARER_TOKEN);
    }
    return match[1];
  }

}
