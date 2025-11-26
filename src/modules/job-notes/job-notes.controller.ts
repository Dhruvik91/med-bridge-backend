import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { JobNotesService } from './job-notes.service';
import { JobNote } from '../../database/entities/job-note.entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateJobNoteDto } from './dto/create-job-note.dto';
import { UpdateJobNoteDto } from './dto/update-job-note.dto';
import {
  ApiCreatedResponseEnvelope,
  ApiOkResponseEnvelope,
  EmptyResponseDto,
} from '../../core/swagger/response-envelope';

@ApiTags('Job Notes')
@ApiBearerAuth()
@Controller('job-notes')
export class JobNotesController {
  constructor(private readonly service: JobNotesService) {}

  @Get()
  @ApiOperation({ summary: 'List all job notes' })
  @ApiOkResponseEnvelope(JobNote, true)
  findAll(): Promise<JobNote[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get job note by ID' })
  @ApiOkResponseEnvelope(JobNote)
  @ApiNotFoundResponse({ description: 'Job note not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('job/:jobId')
  @ApiOperation({ summary: 'List notes for a job' })
  @ApiOkResponseEnvelope(JobNote, true)
  findByJob(@Param('jobId') jobId: string) {
    return this.service.findByJob(jobId);
  }

  @Get('application/:applicationId')
  @ApiOperation({ summary: 'List notes for an application' })
  @ApiOkResponseEnvelope(JobNote, true)
  findByApplication(@Param('applicationId') applicationId: string) {
    return this.service.findByApplication(applicationId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new job note' })
  @ApiCreatedResponseEnvelope(JobNote)
  create(@Body() dto: CreateJobNoteDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a job note' })
  @ApiOkResponseEnvelope(JobNote)
  @ApiNotFoundResponse({ description: 'Job note not found' })
  update(@Param('id') id: string, @Body() dto: UpdateJobNoteDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job note' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
