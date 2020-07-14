import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: UserDto) {
    await this.userRepository.save(user);
    if (user.cats.length) {
      const cats = user.cats.map((c) => {
        c.userId = user.id;
        return c;
      });
      await this.userRepository.manager.getRepository('Cat').save(cats);
    }
    return true;
  }

  async findAll() {
    return this.userRepository.find({ relations: ['cat'] });
  }
}
