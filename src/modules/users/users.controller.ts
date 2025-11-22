import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../database/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() dto: Partial<User>): Promise<User> {
    return this.usersService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<User>): Promise<User> {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
