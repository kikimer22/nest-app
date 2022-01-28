import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

export type FakeUser = any;

@Injectable()
export class UsersService {

  private readonly fakeUser: FakeUser[];

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    this.fakeUser = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const noUnique = await this.findAll().then(
      (users: User[]) =>
        users.filter((user: User) => user.username === username).length,
    ); // 1 : 0
    if (!!noUnique) {
      console.log('email (' + username + ') already exist');
      return null;
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

  async findOneFake(username: string): Promise<User | undefined> {
    return this.fakeUser.find(user => user.username === username);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
