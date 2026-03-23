import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CandidateProfilesService } from './candidate-profiles.service';
import { CreateCandidateProfileDto } from './dto/create-candidate-profile.dto';
import { UpdateCandidateProfileDto } from './dto/update-candidate-profile.dto';
import { CandidateProfile } from '../../database/entities/candidate-profile.entity';
import { PageOptionsDto } from '../../core/dto/page-options.dto';
import { PageDto } from '../../core/dto/page.dto';
import {
  ApiCreatedResponseEnvelope,
  ApiOkResponseEnvelope,
  ApiPaginatedResponseEnvelope,
} from '../../core/swagger/response-envelope';
import { CreateClinicalProfileDto } from './dto/create-clinical-profile.dto';
import { ClinicalProfile } from '../../database/entities/clinical-profile.entity';

@ApiTags('Candidate Profiles')
@ApiBearerAuth()
@Controller('candidate-profiles')
export class CandidateProfilesController {
  constructor(private readonly candidateProfilesService: CandidateProfilesService) {}

  @Post()
  @ApiOperation({ summary: 'Create or complete a candidate profile' })
  @ApiCreatedResponseEnvelope(CandidateProfile)
  create(@Req() req: any, @Body() createDto: CreateCandidateProfileDto) {
    // Assuming user id is in req.user.id from JWT
    const userId = req.user.id;
    return this.candidateProfilesService.create(userId, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all candidate profiles' })
  @ApiPaginatedResponseEnvelope(CandidateProfile)
  findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<CandidateProfile>> {
    return this.candidateProfilesService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a candidate profile by ID' })
  @ApiOkResponseEnvelope(CandidateProfile)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.candidateProfilesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a candidate profile' })
  @ApiOkResponseEnvelope(CandidateProfile)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDto: UpdateCandidateProfileDto) {
    return this.candidateProfilesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a candidate profile' })
  @ApiOkResponseEnvelope(CandidateProfile)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.candidateProfilesService.remove(id);
  }

  // Specialized Pillar Extensions
  @Post('clinical')
  @ApiOperation({ summary: 'Create or update clinical extension profile' })
  @ApiCreatedResponseEnvelope(ClinicalProfile)
  createClinical(@Body() dto: CreateClinicalProfileDto) {
    return this.candidateProfilesService.createClinicalProfile(dto);
  }

  @Get('clinical/:candidateRoleId')
  @ApiOperation({ summary: 'Get clinical profile by candidateRoleId' })
  @ApiOkResponseEnvelope(ClinicalProfile)
  getClinical(@Param('candidateRoleId', ParseUUIDPipe) candidateRoleId: string) {
    return this.candidateProfilesService.getClinicalProfile(candidateRoleId);
  }
}
