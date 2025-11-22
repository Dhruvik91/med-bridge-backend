import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from '../../database/entities/job.entity';

@Controller('jobs')
export class JobsController {
  constructor(private readonly service: JobsService) {}

  @Get()
  findAll(): Promise<Job[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('hospital/:hospitalId')
  findByHospital(@Param('hospitalId') hospitalId: string) {
    return this.service.findByHospital(hospitalId);
  }

  @Post()
  create(@Body() dto: Partial<Job>) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<Job>) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
