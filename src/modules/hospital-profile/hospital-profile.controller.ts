import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { HospitalProfileService } from './hospital-profile.service';
import { HospitalProfile } from '../../database/entities/hospital-profile.entity';

@Controller('hospital-profiles')
export class HospitalProfileController {
  constructor(private readonly service: HospitalProfileService) {}

  @Get()
  findAll(): Promise<HospitalProfile[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }

  @Post()
  create(@Body() dto: Partial<HospitalProfile>) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<HospitalProfile>) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
