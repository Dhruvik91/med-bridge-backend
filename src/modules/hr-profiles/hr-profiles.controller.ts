import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { HRProfilesService } from './hr-profiles.service';
import { HRProfile } from '../../database/entities/hr-profile.entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateHRProfileDto } from './dto/create-hr-profile.dto';
import { UpdateHRProfileDto } from './dto/update-hr-profile.dto';
import {
  ApiCreatedResponseEnvelope,
  ApiOkResponseEnvelope,
  EmptyResponseDto,
} from '../../core/swagger/response-envelope';

@ApiTags('HR Profiles')
@ApiBearerAuth()
@Controller('hr-profiles')
export class HRProfilesController {
  constructor(private readonly service: HRProfilesService) {}

  @Get()
  @ApiOperation({ summary: 'List all HR profiles' })
  @ApiOkResponseEnvelope(HRProfile, true)
  findAll(): Promise<HRProfile[]> {
    return this.service.findAll();
  }

  @Get('candidate-role/:candidateRoleId')
  @ApiOperation({ summary: 'Get HR profile by candidate role ID' })
  @ApiOkResponseEnvelope(HRProfile)
  findByCandidateRole(@Param('candidateRoleId') candidateRoleId: string): Promise<HRProfile | null> {
    return this.service.findByCandidateRole(candidateRoleId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get HR profile by ID' })
  @ApiOkResponseEnvelope(HRProfile)
  @ApiNotFoundResponse({ description: 'HR profile not found' })
  findOne(@Param('id') id: string): Promise<HRProfile> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create an HR profile' })
  @ApiCreatedResponseEnvelope(HRProfile)
  create(@Body() dto: CreateHRProfileDto): Promise<HRProfile> {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an HR profile' })
  @ApiOkResponseEnvelope(HRProfile)
  @ApiNotFoundResponse({ description: 'HR profile not found' })
  update(@Param('id') id: string, @Body() dto: UpdateHRProfileDto): Promise<HRProfile> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an HR profile' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
