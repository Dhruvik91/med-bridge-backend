import { Controller, Get, Param, Post, Body, Patch, Delete, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Location } from '../../database/entities/location.entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiNotFoundResponse, ApiQuery } from '@nestjs/swagger';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import {
  ApiCreatedResponseEnvelope,
  ApiOkResponseEnvelope,
  EmptyResponseDto,
} from '../../core/swagger/response-envelope';
import { PaginationQueryDto } from '../../core/dto/pagination-query.dto';

@ApiTags('Locations')
@ApiBearerAuth()
@Controller('locations')
export class LocationsController {
  constructor(private readonly service: LocationsService) {}

  @Get()
  @ApiOperation({ summary: 'List all locations' })
  @ApiQuery({ name: 'city', required: false })
  @ApiOkResponseEnvelope(Location, true)
  findAll(
    @Query('city') city: string | undefined,
    @Query() pagination: PaginationQueryDto,
  ) {
    const { page, limit } = pagination;
    if (city) return this.service.findByCity(city, page, limit);
    return this.service.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get location by ID' })
  @ApiOkResponseEnvelope(Location)
  @ApiNotFoundResponse({ description: 'Location not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  @ApiCreatedResponseEnvelope(Location)
  create(@Body() dto: CreateLocationDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a location' })
  @ApiOkResponseEnvelope(Location)
  @ApiNotFoundResponse({ description: 'Location not found' })
  update(@Param('id') id: string, @Body() dto: UpdateLocationDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a location' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
