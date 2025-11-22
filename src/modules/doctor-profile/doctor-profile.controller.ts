import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { DoctorProfileService } from './doctor-profile.service';
import { DoctorProfile } from '../../database/entities/doctor-profile.entity';

@Controller('doctor-profiles')
export class DoctorProfileController {
  constructor(private readonly service: DoctorProfileService) {}

  @Get()
  findAll(): Promise<DoctorProfile[]> {
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
  create(@Body() dto: Partial<DoctorProfile>) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<DoctorProfile>) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
