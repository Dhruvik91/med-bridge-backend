import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { MarketingProfilesService } from './marketing-profiles.service';
import { MarketingProfile } from '../../database/entities/marketing-profile.entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateMarketingProfileDto } from './dto/create-marketing-profile.dto';
import { UpdateMarketingProfileDto } from './dto/update-marketing-profile.dto';
import { ApiCreatedResponseEnvelope, ApiOkResponseEnvelope, EmptyResponseDto } from '../../core/swagger/response-envelope';

@ApiTags('Marketing Profiles')
@ApiBearerAuth()
@Controller('marketing-profiles')
export class MarketingProfilesController {
  constructor(private readonly service: MarketingProfilesService) {}

  @Get()
  @ApiOperation({ summary: 'List all marketing profiles' })
  @ApiOkResponseEnvelope(MarketingProfile, true)
  findAll(): Promise<MarketingProfile[]> {
    return this.service.findAll();
  }

  @Get('candidate-role/:candidateRoleId')
  @ApiOperation({ summary: 'Get marketing profile by candidate role ID' })
  @ApiOkResponseEnvelope(MarketingProfile)
  findByCandidateRole(@Param('candidateRoleId') candidateRoleId: string): Promise<MarketingProfile | null> {
    return this.service.findByCandidateRole(candidateRoleId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get marketing profile by ID' })
  @ApiOkResponseEnvelope(MarketingProfile)
  @ApiNotFoundResponse({ description: 'Marketing profile not found' })
  findOne(@Param('id') id: string): Promise<MarketingProfile> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a marketing profile' })
  @ApiCreatedResponseEnvelope(MarketingProfile)
  create(@Body() dto: CreateMarketingProfileDto): Promise<MarketingProfile> {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a marketing profile' })
  @ApiOkResponseEnvelope(MarketingProfile)
  @ApiNotFoundResponse({ description: 'Marketing profile not found' })
  update(@Param('id') id: string, @Body() dto: UpdateMarketingProfileDto): Promise<MarketingProfile> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a marketing profile' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
