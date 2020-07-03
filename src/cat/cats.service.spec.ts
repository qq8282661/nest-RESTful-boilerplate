import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from '../cat/cats.service';
import { AppModule } from '../app.module';
import { Cat } from '../cat/cat.entity';

describe('AppService', () => {
  let catsService: CatsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    catsService = app.get<CatsService>(CatsService);
  });

  describe('app service', () => {
    it('should return Array!', async () => {
      expect((await catsService.findAll()) instanceof Array).toBe(true);
    });
  });
});
