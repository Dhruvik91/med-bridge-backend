import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from '../../database/entities/job.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@ApiTags('Jobs')
@ApiBearerAuth()
@Controller('jobs')
export class JobsController {
  constructor(private readonly service: JobsService) {}

  @Get()
  @ApiOperation({ summary: 'List all jobs' })
  @ApiOkResponse({ type: Job, isArray: true })
  findAll(): Promise<Job[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get job by ID' })
  @ApiOkResponse({ type: Job })
  @ApiNotFoundResponse({ description: 'Job not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('hospital/:hospitalId')
  @ApiOperation({ summary: 'List jobs for a hospital' })
  @ApiOkResponse({ type: Job, isArray: true })
  findByHospital(@Param('hospitalId') hospitalId: string) {
    return this.service.findByHospital(hospitalId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new job' })
  @ApiCreatedResponse({ type: Job })
  create(@Body() dto: CreateJobDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a job' })
  @ApiOkResponse({ type: Job })
  @ApiNotFoundResponse({ description: 'Job not found' })
  update(@Param('id') id: string, @Body() dto: UpdateJobDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job' })
  @ApiOkResponse({ description: 'Job removed successfully' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
