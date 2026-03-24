import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { OperationsProfilesService } from './operations-profiles.service';
import { OperationsProfile } from '../../database/entities/operations-profile.entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateOperationsProfileDto } from './dto/create-operations-profile.dto';
import { UpdateOperationsProfileDto } from './dto/update-operations-profile.dto';
import { ApiCreatedResponseEnvelope, ApiOkResponseEnvelope, EmptyResponseDto } from '../../core/swagger/response-envelope';

@ApiTags('Operations Profiles')
@ApiBearerAuth()
@Controller('operations-profiles')
export class OperationsProfilesController {
  constructor(private readonly service: OperationsProfilesService) {}

  @Get()
  @ApiOperation({ summary: 'List all operations profiles' })
  @ApiOkResponseEnvelope(OperationsProfile, true)
  findAll(): Promise<OperationsProfile[]> {
    return this.service.findAll();
  }

  @Get('candidate-role/:candidateRoleId')
  @ApiOperation({ summary: 'Get operations profile by candidate role ID' })
  @ApiOkResponseEnvelope(OperationsProfile)
  findByCandidateRole(@Param('candidateRoleId') candidateRoleId: string): Promise<OperationsProfile | null> {
    return this.service.findByCandidateRole(candidateRoleId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get operations profile by ID' })
  @ApiOkResponseEnvelope(OperationsProfile)
  @ApiNotFoundResponse({ description: 'Operations profile not found' })
  findOne(@Param('id') id: string): Promise<OperationsProfile> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create an operations profile' })
  @ApiCreatedResponseEnvelope(OperationsProfile)
  create(@Body() dto: CreateOperationsProfileDto): Promise<OperationsProfile> {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an operations profile' })
  @ApiOkResponseEnvelope(OperationsProfile)
  @ApiNotFoundResponse({ description: 'Operations profile not found' })
  update(@Param('id') id: string, @Body() dto: UpdateOperationsProfileDto): Promise<OperationsProfile> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an operations profile' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
