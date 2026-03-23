import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PillarsService } from './pillars.service';
import { CreatePillarDto } from './dto/create-pillar.dto';
import { UpdatePillarDto } from './dto/update-pillar.dto';
import { Pillar } from '../../database/entities/pillar.entity';
import { PageOptionsDto } from '../../core/dto/page-options.dto';
import { PageDto } from '../../core/dto/page.dto';
import {
  ApiCreatedResponseEnvelope,
  ApiOkResponseEnvelope,
  ApiPaginatedResponseEnvelope,
} from '../../core/swagger/response-envelope';

@ApiTags('Pillars')
@ApiBearerAuth()
@Controller('pillars')
export class PillarsController {
  constructor(private readonly pillarsService: PillarsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a professional pillar' })
  @ApiCreatedResponseEnvelope(Pillar)
  create(@Body() createPillarDto: CreatePillarDto) {
    return this.pillarsService.create(createPillarDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all professional pillars' })
  @ApiPaginatedResponseEnvelope(Pillar)
  findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<Pillar>> {
    return this.pillarsService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a professional pillar by ID' })
  @ApiOkResponseEnvelope(Pillar)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.pillarsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a professional pillar' })
  @ApiOkResponseEnvelope(Pillar)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePillarDto: UpdatePillarDto) {
    return this.pillarsService.update(id, updatePillarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a professional pillar' })
  @ApiOkResponseEnvelope(Pillar) // Or a dedicated EmptyResponseDto
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.pillarsService.remove(id);
  }
}
