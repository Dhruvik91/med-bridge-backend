import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { LegalProfilesService } from './legal-profiles.service';
import { LegalProfile } from '../../database/entities/legal-profile.entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateLegalProfileDto } from './dto/create-legal-profile.dto';
import { UpdateLegalProfileDto } from './dto/update-legal-profile.dto';
import { ApiCreatedResponseEnvelope, ApiOkResponseEnvelope, EmptyResponseDto } from '../../core/swagger/response-envelope';

@ApiTags('Legal Profiles')
@ApiBearerAuth()
@Controller('legal-profiles')
export class LegalProfilesController {
  constructor(private readonly service: LegalProfilesService) {}

  @Get()
  @ApiOperation({ summary: 'List all legal profiles' })
  @ApiOkResponseEnvelope(LegalProfile, true)
  findAll(): Promise<LegalProfile[]> {
    return this.service.findAll();
  }

  @Get('candidate-role/:candidateRoleId')
  @ApiOperation({ summary: 'Get legal profile by candidate role ID' })
  @ApiOkResponseEnvelope(LegalProfile)
  findByCandidateRole(@Param('candidateRoleId') candidateRoleId: string): Promise<LegalProfile | null> {
    return this.service.findByCandidateRole(candidateRoleId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get legal profile by ID' })
  @ApiOkResponseEnvelope(LegalProfile)
  @ApiNotFoundResponse({ description: 'Legal profile not found' })
  findOne(@Param('id') id: string): Promise<LegalProfile> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a legal profile' })
  @ApiCreatedResponseEnvelope(LegalProfile)
  create(@Body() dto: CreateLegalProfileDto): Promise<LegalProfile> {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a legal profile' })
  @ApiOkResponseEnvelope(LegalProfile)
  @ApiNotFoundResponse({ description: 'Legal profile not found' })
  update(@Param('id') id: string, @Body() dto: UpdateLegalProfileDto): Promise<LegalProfile> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a legal profile' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
