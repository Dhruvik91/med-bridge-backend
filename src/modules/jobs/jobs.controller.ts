import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from '../../database/entities/job.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import {
  ApiCreatedResponseEnvelope,
  ApiOkResponseEnvelope,
  EmptyResponseDto,
} from '../../core/swagger/response-envelope';

@ApiTags('Jobs')
@ApiBearerAuth()
@Controller('jobs')
export class JobsController {
  constructor(private readonly service: JobsService) {}

  @Get()
  @ApiOperation({ summary: 'List all jobs' })
  @ApiOkResponseEnvelope(Job, true)
  findAll(): Promise<Job[]> {
    return this.service.findAll();
  }

  @Get('employer/:employerProfileId')
  @ApiOperation({ summary: 'List jobs for an employer' })
  @ApiOkResponseEnvelope(Job, true)
  findByEmployer(@Param('employerProfileId') employerProfileId: string) {
    return this.service.findByEmployer(employerProfileId);
  }

  @Get('organization/:organizationId')
  @ApiOperation({ summary: 'List jobs for an organization' })
  @ApiOkResponseEnvelope(Job, true)
  findByOrganization(@Param('organizationId') organizationId: string) {
    return this.service.findByOrganization(organizationId);
  }

  @Get('location/:locationId')
  @ApiOperation({ summary: 'List jobs for a location' })
  @ApiOkResponseEnvelope(Job, true)
  findByLocation(@Param('locationId') locationId: string) {
    return this.service.findByLocation(locationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get job by ID' })
  @ApiOkResponseEnvelope(Job)
  @ApiNotFoundResponse({ description: 'Job not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new job' })
  @ApiCreatedResponseEnvelope(Job)
  create(@Body() dto: CreateJobDto) {
    return this.service.create(dto);
  }

  @Post(':id/view')
  @ApiOperation({ summary: 'Increment job view count' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  incrementViews(@Param('id') id: string) {
    return this.service.incrementViews(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a job' })
  @ApiOkResponseEnvelope(Job)
  @ApiNotFoundResponse({ description: 'Job not found' })
  update(@Param('id') id: string, @Body() dto: UpdateJobDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
