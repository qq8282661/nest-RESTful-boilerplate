import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import profiler = require('v8-profiler-node8');
import fs = require('fs');
import Bluebird = require('bluebird');

import { UsersService } from './user.service';
import { UserDto } from './user.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private configService: ConfigService) {}

  @Post()
  @Roles('admin')
  async create(@Body() createUserDto: UserDto) {
    await this.usersService.create(createUserDto);
    return createUserDto;
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(
  //   @Param('id', new ParseIntPipe())
  //   id,
  // ) {
  //   // logic
  // }

  @Get('start')
  async startProfiler() {
    console.log('开始收集');

    profiler.deleteAllProfiles();
    // Start Profiling
    profiler.startProfiling('CPU profile');

    await Bluebird.delay(5 * 60000);

    const profile = profiler.stopProfiling();
    profile
      .export()
      .pipe(fs.createWriteStream(`cpuprofile-${Date.now()}.cpuprofile`))
      .on('finish', () => profile.delete());
    console.log('收集完成');
    return 'success!';
  }
}
