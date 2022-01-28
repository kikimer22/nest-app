import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const noUnique = await this.findByUsername(username);
    if (!!noUnique) {
      throw new Error('email (' + username + ') already exist').message;
    }
    const user = new User();
    user.username = username;
    user.password = password;
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ username });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
