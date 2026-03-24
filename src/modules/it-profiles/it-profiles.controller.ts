import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ITProfilesService } from './it-profiles.service';
import { ITProfile } from '../../database/entities/it-profile.entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateITProfileDto } from './dto/create-it-profile.dto';
import { UpdateITProfileDto } from './dto/update-it-profile.dto';
import { ApiCreatedResponseEnvelope, ApiOkResponseEnvelope, EmptyResponseDto } from '../../core/swagger/response-envelope';

@ApiTags('IT Profiles')
@ApiBearerAuth()
@Controller('it-profiles')
export class ITProfilesController {
  constructor(private readonly service: ITProfilesService) {}

  @Get()
  @ApiOperation({ summary: 'List all IT profiles' })
  @ApiOkResponseEnvelope(ITProfile, true)
  findAll(): Promise<ITProfile[]> {
    return this.service.findAll();
  }

  @Get('candidate-role/:candidateRoleId')
  @ApiOperation({ summary: 'Get IT profile by candidate role ID' })
  @ApiOkResponseEnvelope(ITProfile)
  findByCandidateRole(@Param('candidateRoleId') candidateRoleId: string): Promise<ITProfile | null> {
    return this.service.findByCandidateRole(candidateRoleId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get IT profile by ID' })
  @ApiOkResponseEnvelope(ITProfile)
  @ApiNotFoundResponse({ description: 'IT profile not found' })
  findOne(@Param('id') id: string): Promise<ITProfile> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create an IT profile' })
  @ApiCreatedResponseEnvelope(ITProfile)
  create(@Body() dto: CreateITProfileDto): Promise<ITProfile> {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an IT profile' })
  @ApiOkResponseEnvelope(ITProfile)
  @ApiNotFoundResponse({ description: 'IT profile not found' })
  update(@Param('id') id: string, @Body() dto: UpdateITProfileDto): Promise<ITProfile> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an IT profile' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
