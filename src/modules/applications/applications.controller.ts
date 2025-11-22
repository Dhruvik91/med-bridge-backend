import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { Application } from '../../database/entities/application.entity';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly service: ApplicationsService) {}

  @Get()
  findAll(): Promise<Application[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('doctor/:doctorId')
  findByDoctor(@Param('doctorId') doctorId: string) {
    return this.service.findByDoctor(doctorId);
  }

  @Get('job/:jobId')
  findByJob(@Param('jobId') jobId: string) {
    return this.service.findByJob(jobId);
  }

  @Post()
  create(@Body() dto: Partial<Application>) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<Application>) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
