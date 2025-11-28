import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { EmployerProfileService } from './employer-profile.service';
import { EmployerProfile } from '../../database/entities/employer-profile.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateEmployerProfileDto } from './dto/create-employer-profile.dto';
import { UpdateEmployerProfileDto } from './dto/update-employer-profile.dto';
import {
  ApiCreatedResponseEnvelope,
  ApiOkResponseEnvelope,
  EmptyResponseDto,
} from '../../core/swagger/response-envelope';

@ApiTags('Employer Profiles')
@ApiBearerAuth()
@Controller('employer-profiles')
export class EmployerProfileController {
  constructor(private readonly service: EmployerProfileService) {}

  @Get()
  @ApiOperation({ summary: 'List all employer profiles' })
  @ApiOkResponseEnvelope(EmployerProfile, true)
  findAll(): Promise<EmployerProfile[]> {
    return this.service.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get employer profile by user ID' })
  @ApiOkResponseEnvelope(EmployerProfile)
  findByUser(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get employer profile by ID' })
  @ApiOkResponseEnvelope(EmployerProfile)
  @ApiNotFoundResponse({ description: 'Employer profile not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create an employer profile' })
  @ApiCreatedResponseEnvelope(EmployerProfile)
  create(@Body() dto: CreateEmployerProfileDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an employer profile' })
  @ApiOkResponseEnvelope(EmployerProfile)
  @ApiNotFoundResponse({ description: 'Employer profile not found' })
  update(@Param('id') id: string, @Body() dto: UpdateEmployerProfileDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an employer profile' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
