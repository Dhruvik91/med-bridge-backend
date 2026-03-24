import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { FinanceProfilesService } from './finance-profiles.service';
import { FinanceProfile } from '../../database/entities/finance-profile.entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateFinanceProfileDto } from './dto/create-finance-profile.dto';
import { UpdateFinanceProfileDto } from './dto/update-finance-profile.dto';
import { ApiCreatedResponseEnvelope, ApiOkResponseEnvelope, EmptyResponseDto } from '../../core/swagger/response-envelope';

@ApiTags('Finance Profiles')
@ApiBearerAuth()
@Controller('finance-profiles')
export class FinanceProfilesController {
  constructor(private readonly service: FinanceProfilesService) {}

  @Get()
  @ApiOperation({ summary: 'List all finance profiles' })
  @ApiOkResponseEnvelope(FinanceProfile, true)
  findAll(): Promise<FinanceProfile[]> {
    return this.service.findAll();
  }

  @Get('candidate-role/:candidateRoleId')
  @ApiOperation({ summary: 'Get finance profile by candidate role ID' })
  @ApiOkResponseEnvelope(FinanceProfile)
  findByCandidateRole(@Param('candidateRoleId') candidateRoleId: string): Promise<FinanceProfile | null> {
    return this.service.findByCandidateRole(candidateRoleId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get finance profile by ID' })
  @ApiOkResponseEnvelope(FinanceProfile)
  @ApiNotFoundResponse({ description: 'Finance profile not found' })
  findOne(@Param('id') id: string): Promise<FinanceProfile> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a finance profile' })
  @ApiCreatedResponseEnvelope(FinanceProfile)
  create(@Body() dto: CreateFinanceProfileDto): Promise<FinanceProfile> {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a finance profile' })
  @ApiOkResponseEnvelope(FinanceProfile)
  @ApiNotFoundResponse({ description: 'Finance profile not found' })
  update(@Param('id') id: string, @Body() dto: UpdateFinanceProfileDto): Promise<FinanceProfile> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a finance profile' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
