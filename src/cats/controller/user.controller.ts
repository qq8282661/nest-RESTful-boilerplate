import { Body, Controller, Get, Param, Post, UseGuards, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UsersService } from '../service/user.service';
import { UserDto } from './dto/user.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { ParseIntPipe } from '../../common/pipes/parse-int.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private configService: ConfigService) {}

  @Post()
  @Roles('admin')
  async create(@Body() createUserDto: UserDto) {
    this.usersService.create(createUserDto);
    return createUserDto;
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id,
  ) {
    // logic
  }
}
