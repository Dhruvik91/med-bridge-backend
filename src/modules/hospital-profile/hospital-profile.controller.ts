import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { HospitalProfileService } from './hospital-profile.service';
import { HospitalProfile } from '../../database/entities/hospital-profile.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateHospitalProfileDto } from './dto/create-hospital-profile.dto';
import { UpdateHospitalProfileDto } from './dto/update-hospital-profile.dto';
import {
  ApiCreatedResponseEnvelope,
  ApiOkResponseEnvelope,
  EmptyResponseDto,
} from '../../core/swagger/response-envelope';

@ApiTags('Hospital Profiles')
@ApiBearerAuth()
@Controller('hospital-profiles')
export class HospitalProfileController {
  constructor(private readonly service: HospitalProfileService) {}

  @Get()
  @ApiOperation({ summary: 'List all hospital profiles' })
  @ApiOkResponseEnvelope(HospitalProfile, true)
  findAll(): Promise<HospitalProfile[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get hospital profile by ID' })
  @ApiOkResponseEnvelope(HospitalProfile)
  @ApiNotFoundResponse({ description: 'Hospital profile not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get hospital profile by user ID' })
  @ApiOkResponseEnvelope(HospitalProfile)
  findByUser(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a hospital profile' })
  @ApiCreatedResponseEnvelope(HospitalProfile)
  create(@Body() dto: CreateHospitalProfileDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a hospital profile' })
  @ApiOkResponseEnvelope(HospitalProfile)
  @ApiNotFoundResponse({ description: 'Hospital profile not found' })
  update(@Param('id') id: string, @Body() dto: UpdateHospitalProfileDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a hospital profile' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
