import { Controller, Get, Param, Post, Body, Patch, Delete, Query } from '@nestjs/common';
import { QualificationsService } from './qualifications.service';
import { Qualification } from '../../database/entities/qualification.entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateQualificationDto } from './dto/create-qualification.dto';
import { UpdateQualificationDto } from './dto/update-qualification.dto';
import {
    ApiCreatedResponseEnvelope,
    ApiOkResponseEnvelope,
    EmptyResponseDto,
} from '../../core/swagger/response-envelope';
import { PaginationQueryDto } from '../../core/dto/pagination-query.dto';

@ApiTags('Qualifications')
@ApiBearerAuth()
@Controller('qualifications')
export class QualificationsController {
    constructor(private readonly service: QualificationsService) { }

    @Get()
    @ApiOperation({ summary: 'List all qualifications' })
    @ApiOkResponseEnvelope(Qualification, true)
    findAll(@Query() pagination: PaginationQueryDto) {
        const { page, limit } = pagination;
        return this.service.findAll(page, limit);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get qualification by ID' })
    @ApiOkResponseEnvelope(Qualification)
    @ApiNotFoundResponse({ description: 'Qualification not found' })
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Get('slug/:slug')
    @ApiOperation({ summary: 'Get qualification by slug' })
    @ApiOkResponseEnvelope(Qualification)
    @ApiNotFoundResponse({ description: 'Qualification not found' })
    findBySlug(@Param('slug') slug: string) {
        return this.service.findBySlug(slug);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new qualification' })
    @ApiCreatedResponseEnvelope(Qualification)
    create(@Body() dto: CreateQualificationDto) {
        return this.service.create(dto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a qualification' })
    @ApiOkResponseEnvelope(Qualification)
    @ApiNotFoundResponse({ description: 'Qualification not found' })
    update(@Param('id') id: string, @Body() dto: UpdateQualificationDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a qualification' })
    @ApiOkResponseEnvelope(EmptyResponseDto)
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
