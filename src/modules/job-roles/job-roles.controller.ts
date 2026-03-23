import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JobRolesService } from './job-roles.service';
import { CreateJobRoleDto } from './dto/create-job-role.dto';
import { UpdateJobRoleDto } from './dto/update-job-role.dto';
import { JobRoleQueryDto } from './dto/job-role-query.dto';
import { JobRole } from '../../database/entities/job-role.entity';
import { PageDto } from '../../core/dto/page.dto';
import {
  ApiCreatedResponseEnvelope,
  ApiOkResponseEnvelope,
  ApiPaginatedResponseEnvelope,
} from '../../core/swagger/response-envelope';

@ApiTags('Job Roles')
@ApiBearerAuth()
@Controller('job-roles')
export class JobRolesController {
  constructor(private readonly jobRolesService: JobRolesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new job role' })
  @ApiCreatedResponseEnvelope(JobRole)
  create(@Body() createJobRoleDto: CreateJobRoleDto) {
    return this.jobRolesService.create(createJobRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all job roles' })
  @ApiPaginatedResponseEnvelope(JobRole)
  findAll(@Query() queryDto: JobRoleQueryDto): Promise<PageDto<JobRole>> {
    return this.jobRolesService.findAll(queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a job role by ID' })
  @ApiOkResponseEnvelope(JobRole)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.jobRolesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a job role' })
  @ApiOkResponseEnvelope(JobRole)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateJobRoleDto: UpdateJobRoleDto) {
    return this.jobRolesService.update(id, updateJobRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job role' })
  @ApiOkResponseEnvelope(JobRole)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.jobRolesService.remove(id);
  }
}
