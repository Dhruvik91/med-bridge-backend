import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { Organization } from '../../database/entities/organization.entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import {
  ApiCreatedResponseEnvelope,
  ApiOkResponseEnvelope,
  EmptyResponseDto,
} from '../../core/swagger/response-envelope';

@ApiTags('Organizations')
@ApiBearerAuth()
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly service: OrganizationsService) {}

  @Get()
  @ApiOperation({ summary: 'List all organizations' })
  @ApiOkResponseEnvelope(Organization, true)
  findAll(): Promise<Organization[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get organization by ID' })
  @ApiOkResponseEnvelope(Organization)
  @ApiNotFoundResponse({ description: 'Organization not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('employer/:employerProfileId')
  @ApiOperation({ summary: 'List organizations for an employer' })
  @ApiOkResponseEnvelope(Organization, true)
  findByEmployer(@Param('employerProfileId') employerProfileId: string) {
    return this.service.findByEmployer(employerProfileId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new organization' })
  @ApiCreatedResponseEnvelope(Organization)
  create(@Body() dto: CreateOrganizationDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an organization' })
  @ApiOkResponseEnvelope(Organization)
  @ApiNotFoundResponse({ description: 'Organization not found' })
  update(@Param('id') id: string, @Body() dto: UpdateOrganizationDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an organization' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
