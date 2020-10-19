import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CatDto } from './cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  create(cat: CatDto) {
    this.catRepository.save(cat);
  }

  async findAll() {
    // const cats = this.catRepository
    //   .createQueryBuilder('cat')
    //   .leftJoinAndSelect('cat.user', 'user')
    //   .select(['cat', 'user.name'])
    //   .getMany();

    const cats = this.catRepository.findAndCount({ relations: ['user'] });

    return cats;
  }
}
