import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { SavedJobsService } from './saved-jobs.service';
import { SavedJob } from '../../database/entities/saved-job.entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateSavedJobDto } from './dto/create-saved-job.dto';
import {
  ApiCreatedResponseEnvelope,
  ApiOkResponseEnvelope,
  EmptyResponseDto,
} from '../../core/swagger/response-envelope';

@ApiTags('Saved Jobs')
@ApiBearerAuth()
@Controller('saved-jobs')
export class SavedJobsController {
  constructor(private readonly service: SavedJobsService) {}

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all saved jobs for a user' })
  @ApiOkResponseEnvelope(SavedJob, true)
  findByUser(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Save a job' })
  @ApiCreatedResponseEnvelope(SavedJob)
  save(@Body() dto: CreateSavedJobDto) {
    return this.service.save(dto);
  }

  @Delete('user/:userId/job/:jobId')
  @ApiOperation({ summary: 'Unsave a job' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  @ApiNotFoundResponse({ description: 'Saved job not found' })
  unsave(@Param('userId') userId: string, @Param('jobId') jobId: string) {
    return this.service.unsave(userId, jobId);
  }
}
