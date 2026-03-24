import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { CandidatePreferencesService } from './candidate-preferences.service';
import { CandidatePreference } from '../../database/entities/candidate-preference.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateCandidatePreferenceDto } from './dto/create-candidate-preference.dto';
import { UpdateCandidatePreferenceDto } from './dto/update-candidate-preference.dto';
import {
  ApiCreatedResponseEnvelope,
  ApiOkResponseEnvelope,
  EmptyResponseDto,
} from '../../core/swagger/response-envelope';

@ApiTags('Candidate Preferences')
@ApiBearerAuth()
@Controller('candidate-preferences')
export class CandidatePreferencesController {
  constructor(private readonly service: CandidatePreferencesService) {}

  @Get()
  @ApiOperation({ summary: 'List all candidate preferences' })
  @ApiOkResponseEnvelope(CandidatePreference, true)
  findAll(): Promise<CandidatePreference[]> {
    return this.service.findAll();
  }

  @Get('candidate/:candidateId')
  @ApiOperation({ summary: 'Get preferences by candidate ID' })
  @ApiOkResponseEnvelope(CandidatePreference)
  findByCandidate(@Param('candidateId') candidateId: string): Promise<CandidatePreference | null> {
    return this.service.findByCandidate(candidateId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get preference by ID' })
  @ApiOkResponseEnvelope(CandidatePreference)
  @ApiNotFoundResponse({ description: 'Candidate preference not found' })
  findOne(@Param('id') id: string): Promise<CandidatePreference> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create candidate preferences' })
  @ApiCreatedResponseEnvelope(CandidatePreference)
  create(@Body() dto: CreateCandidatePreferenceDto): Promise<CandidatePreference> {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update candidate preferences' })
  @ApiOkResponseEnvelope(CandidatePreference)
  @ApiNotFoundResponse({ description: 'Candidate preference not found' })
  update(@Param('id') id: string, @Body() dto: UpdateCandidatePreferenceDto): Promise<CandidatePreference> {
    return this.service.update(id, dto);
  }

  @Patch('candidate/:candidateId')
  @ApiOperation({ summary: 'Update preferences by candidate ID (creates if not exists)' })
  @ApiOkResponseEnvelope(CandidatePreference)
  updateByCandidate(
    @Param('candidateId') candidateId: string, 
    @Body() dto: UpdateCandidatePreferenceDto
  ): Promise<CandidatePreference> {
    return this.service.updateByCandidate(candidateId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete candidate preferences' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
