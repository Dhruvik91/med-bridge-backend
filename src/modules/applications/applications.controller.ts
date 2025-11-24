import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { Application } from '../../database/entities/application.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@ApiTags('Applications')
@ApiBearerAuth()
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly service: ApplicationsService) {}

  @Get()
  @ApiOperation({ summary: 'List all applications' })
  @ApiOkResponse({ type: Application, isArray: true })
  findAll(): Promise<Application[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get application by ID' })
  @ApiOkResponse({ type: Application })
  @ApiNotFoundResponse({ description: 'Application not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('doctor/:doctorId')
  @ApiOperation({ summary: 'List applications for a doctor' })
  @ApiOkResponse({ type: Application, isArray: true })
  findByDoctor(@Param('doctorId') doctorId: string) {
    return this.service.findByDoctor(doctorId);
  }

  @Get('job/:jobId')
  @ApiOperation({ summary: 'List applications for a job' })
  @ApiOkResponse({ type: Application, isArray: true })
  findByJob(@Param('jobId') jobId: string) {
    return this.service.findByJob(jobId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new application' })
  @ApiCreatedResponse({ type: Application })
  create(@Body() dto: CreateApplicationDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an application' })
  @ApiOkResponse({ type: Application })
  @ApiNotFoundResponse({ description: 'Application not found' })
  update(@Param('id') id: string, @Body() dto: UpdateApplicationDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an application' })
  @ApiOkResponse({ description: 'Application removed successfully' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
