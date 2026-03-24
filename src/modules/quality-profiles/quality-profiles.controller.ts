import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { QualityProfilesService } from './quality-profiles.service';
import { QualityProfile } from '../../database/entities/quality-profile.entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateQualityProfileDto } from './dto/create-quality-profile.dto';
import { UpdateQualityProfileDto } from './dto/update-quality-profile.dto';
import { ApiCreatedResponseEnvelope, ApiOkResponseEnvelope, EmptyResponseDto } from '../../core/swagger/response-envelope';

@ApiTags('Quality Profiles')
@ApiBearerAuth()
@Controller('quality-profiles')
export class QualityProfilesController {
  constructor(private readonly service: QualityProfilesService) {}

  @Get()
  @ApiOperation({ summary: 'List all quality profiles' })
  @ApiOkResponseEnvelope(QualityProfile, true)
  findAll(): Promise<QualityProfile[]> {
    return this.service.findAll();
  }

  @Get('candidate-role/:candidateRoleId')
  @ApiOperation({ summary: 'Get quality profile by candidate role ID' })
  @ApiOkResponseEnvelope(QualityProfile)
  findByCandidateRole(@Param('candidateRoleId') candidateRoleId: string): Promise<QualityProfile | null> {
    return this.service.findByCandidateRole(candidateRoleId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get quality profile by ID' })
  @ApiOkResponseEnvelope(QualityProfile)
  @ApiNotFoundResponse({ description: 'Quality profile not found' })
  findOne(@Param('id') id: string): Promise<QualityProfile> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a quality profile' })
  @ApiCreatedResponseEnvelope(QualityProfile)
  create(@Body() dto: CreateQualityProfileDto): Promise<QualityProfile> {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a quality profile' })
  @ApiOkResponseEnvelope(QualityProfile)
  @ApiNotFoundResponse({ description: 'Quality profile not found' })
  update(@Param('id') id: string, @Body() dto: UpdateQualityProfileDto): Promise<QualityProfile> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a quality profile' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
