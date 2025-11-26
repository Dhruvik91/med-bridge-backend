import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { Specialty } from '../../database/entities/specialty.entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import {
  ApiCreatedResponseEnvelope,
  ApiOkResponseEnvelope,
  EmptyResponseDto,
} from '../../core/swagger/response-envelope';

@ApiTags('Specialties')
@ApiBearerAuth()
@Controller('specialties')
export class SpecialtiesController {
  constructor(private readonly service: SpecialtiesService) {}

  @Get()
  @ApiOperation({ summary: 'List all specialties' })
  @ApiOkResponseEnvelope(Specialty, true)
  findAll(): Promise<Specialty[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specialty by ID' })
  @ApiOkResponseEnvelope(Specialty)
  @ApiNotFoundResponse({ description: 'Specialty not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get specialty by slug' })
  @ApiOkResponseEnvelope(Specialty)
  @ApiNotFoundResponse({ description: 'Specialty not found' })
  findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new specialty' })
  @ApiCreatedResponseEnvelope(Specialty)
  create(@Body() dto: CreateSpecialtyDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specialty' })
  @ApiOkResponseEnvelope(Specialty)
  @ApiNotFoundResponse({ description: 'Specialty not found' })
  update(@Param('id') id: string, @Body() dto: UpdateSpecialtyDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specialty' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
