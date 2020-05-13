import { Body, Controller, Get, Param, Post, OnModuleInit, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcMethod } from '@nestjs/microservices';

import { nt_module_test } from '../grpc/generated';
import { GrpcClientFactory } from '../grpc/grpc.client-factory';
import { Roles } from '../common/decorators/roles.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from '../service/cats.service';
import { CatDto } from './dto/cat.dto';

@Controller('cats')
export class CatsController implements OnModuleInit {
  onModuleInit() {
    this.catGrpcService = this.grpcClientFactory.testServiceClient.getService('CatService');
  }
  constructor(
    @Inject(GrpcClientFactory) private readonly grpcClientFactory: GrpcClientFactory,
    private readonly catsService: CatsService,
  ) {}
  private catGrpcService: nt_module_test.CatService;

  @Post()
  @Roles('admin')
  async create(@Body() createCatDto: CatDto) {
    this.catsService.create(createCatDto);
    return createCatDto;
  }

  @Get()
  async findAll() {
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 1000);
    // });
    // const a = 1 / 0;
    // console.log('a', a);
    const data = await this.catGrpcService.helloRpc({ name: '小明' }).toPromise();
    return { ...data, cats: await this.catsService.findAll() };
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id,
  ) {}

  @GrpcMethod('CatService')
  helloRpc(params) {
    return { code: 200, message: `hello,${params.name} ,rpc running!` };
  }
}
