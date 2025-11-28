import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { Application } from '../../database/entities/application.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import {
  ApiCreatedResponseEnvelope,
  ApiOkResponseEnvelope,
  EmptyResponseDto,
} from '../../core/swagger/response-envelope';

@ApiTags('Applications')
@ApiBearerAuth()
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly service: ApplicationsService) {}

  @Get()
  @ApiOperation({ summary: 'List all applications' })
  @ApiOkResponseEnvelope(Application, true)
  findAll(): Promise<Application[]> {
    return this.service.findAll();
  }

  @Get('candidate/:candidateId')
  @ApiOperation({ summary: 'List applications for a candidate' })
  @ApiOkResponseEnvelope(Application, true)
  findByCandidate(@Param('candidateId') candidateId: string) {
    return this.service.findByCandidate(candidateId);
  }

  @Get('job/:jobId')
  @ApiOperation({ summary: 'List applications for a job' })
  @ApiOkResponseEnvelope(Application, true)
  findByJob(@Param('jobId') jobId: string) {
    return this.service.findByJob(jobId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get application by ID' })
  @ApiOkResponseEnvelope(Application)
  @ApiNotFoundResponse({ description: 'Application not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new application' })
  @ApiCreatedResponseEnvelope(Application)
  create(@Body() dto: CreateApplicationDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an application' })
  @ApiOkResponseEnvelope(Application)
  @ApiNotFoundResponse({ description: 'Application not found' })
  update(@Param('id') id: string, @Body() dto: UpdateApplicationDto) {
    return this.service.update(id, dto);
  }

  @Post(':id/withdraw')
  @ApiOperation({ summary: 'Withdraw an application' })
  @ApiOkResponseEnvelope(Application)
  @ApiNotFoundResponse({ description: 'Application not found' })
  withdraw(@Param('id') id: string) {
    return this.service.withdraw(id);
  }

  @Post(':id/archive')
  @ApiOperation({ summary: 'Archive an application' })
  @ApiOkResponseEnvelope(Application)
  @ApiNotFoundResponse({ description: 'Application not found' })
  archive(@Param('id') id: string) {
    return this.service.archive(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an application' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
