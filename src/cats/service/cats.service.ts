import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from '../entities/cat.entity';
import { CatDto } from '../controller/dto/cat.dto';

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
    return this.catRepository.find();
  }
}
