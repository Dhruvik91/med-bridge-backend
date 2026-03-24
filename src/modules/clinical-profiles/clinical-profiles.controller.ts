import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ClinicalProfilesService } from './clinical-profiles.service';
import { ClinicalProfile } from '../../database/entities/clinical-profile.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateClinicalProfileDto } from './dto/create-clinical-profile.dto';
import { UpdateClinicalProfileDto } from './dto/update-clinical-profile.dto';
import {
  ApiCreatedResponseEnvelope,
  ApiOkResponseEnvelope,
  EmptyResponseDto,
} from '../../core/swagger/response-envelope';

@ApiTags('Clinical Profiles')
@ApiBearerAuth()
@Controller('clinical-profiles')
export class ClinicalProfilesController {
  constructor(private readonly service: ClinicalProfilesService) {}

  @Get()
  @ApiOperation({ summary: 'List all clinical profiles' })
  @ApiOkResponseEnvelope(ClinicalProfile, true)
  findAll(): Promise<ClinicalProfile[]> {
    return this.service.findAll();
  }

  @Get('candidate-role/:candidateRoleId')
  @ApiOperation({ summary: 'Get clinical profile by candidate role ID' })
  @ApiOkResponseEnvelope(ClinicalProfile)
  findByCandidateRole(@Param('candidateRoleId') candidateRoleId: string): Promise<ClinicalProfile | null> {
    return this.service.findByCandidateRole(candidateRoleId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get clinical profile by ID' })
  @ApiOkResponseEnvelope(ClinicalProfile)
  @ApiNotFoundResponse({ description: 'Clinical profile not found' })
  findOne(@Param('id') id: string): Promise<ClinicalProfile> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a clinical profile' })
  @ApiCreatedResponseEnvelope(ClinicalProfile)
  create(@Body() dto: CreateClinicalProfileDto): Promise<ClinicalProfile> {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a clinical profile' })
  @ApiOkResponseEnvelope(ClinicalProfile)
  @ApiNotFoundResponse({ description: 'Clinical profile not found' })
  update(@Param('id') id: string, @Body() dto: UpdateClinicalProfileDto): Promise<ClinicalProfile> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a clinical profile' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
