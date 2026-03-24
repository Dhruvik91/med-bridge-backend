import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { SupplyChainProfilesService } from './supply-chain-profiles.service';
import { SupplyChainProfile } from '../../database/entities/supply-chain-profile.entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateSupplyChainProfileDto } from './dto/create-supply-chain-profile.dto';
import { UpdateSupplyChainProfileDto } from './dto/update-supply-chain-profile.dto';
import { ApiCreatedResponseEnvelope, ApiOkResponseEnvelope, EmptyResponseDto } from '../../core/swagger/response-envelope';

@ApiTags('Supply Chain Profiles')
@ApiBearerAuth()
@Controller('supply-chain-profiles')
export class SupplyChainProfilesController {
  constructor(private readonly service: SupplyChainProfilesService) {}

  @Get()
  @ApiOperation({ summary: 'List all supply chain profiles' })
  @ApiOkResponseEnvelope(SupplyChainProfile, true)
  findAll(): Promise<SupplyChainProfile[]> {
    return this.service.findAll();
  }

  @Get('candidate-role/:candidateRoleId')
  @ApiOperation({ summary: 'Get supply chain profile by candidate role ID' })
  @ApiOkResponseEnvelope(SupplyChainProfile)
  findByCandidateRole(@Param('candidateRoleId') candidateRoleId: string): Promise<SupplyChainProfile | null> {
    return this.service.findByCandidateRole(candidateRoleId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get supply chain profile by ID' })
  @ApiOkResponseEnvelope(SupplyChainProfile)
  @ApiNotFoundResponse({ description: 'Supply chain profile not found' })
  findOne(@Param('id') id: string): Promise<SupplyChainProfile> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a supply chain profile' })
  @ApiCreatedResponseEnvelope(SupplyChainProfile)
  create(@Body() dto: CreateSupplyChainProfileDto): Promise<SupplyChainProfile> {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a supply chain profile' })
  @ApiOkResponseEnvelope(SupplyChainProfile)
  @ApiNotFoundResponse({ description: 'Supply chain profile not found' })
  update(@Param('id') id: string, @Body() dto: UpdateSupplyChainProfileDto): Promise<SupplyChainProfile> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a supply chain profile' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
