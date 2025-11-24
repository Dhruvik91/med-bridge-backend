import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { HospitalProfileService } from './hospital-profile.service';
import { HospitalProfile } from '../../database/entities/hospital-profile.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateHospitalProfileDto } from './dto/create-hospital-profile.dto';
import { UpdateHospitalProfileDto } from './dto/update-hospital-profile.dto';

@ApiTags('Hospital Profiles')
@ApiBearerAuth()
@Controller('hospital-profiles')
export class HospitalProfileController {
  constructor(private readonly service: HospitalProfileService) {}

  @Get()
  @ApiOperation({ summary: 'List all hospital profiles' })
  @ApiOkResponse({ type: HospitalProfile, isArray: true })
  findAll(): Promise<HospitalProfile[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get hospital profile by ID' })
  @ApiOkResponse({ type: HospitalProfile })
  @ApiNotFoundResponse({ description: 'Hospital profile not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get hospital profile by user ID' })
  @ApiOkResponse({ type: HospitalProfile })
  findByUser(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a hospital profile' })
  @ApiCreatedResponse({ type: HospitalProfile })
  create(@Body() dto: CreateHospitalProfileDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a hospital profile' })
  @ApiOkResponse({ type: HospitalProfile })
  @ApiNotFoundResponse({ description: 'Hospital profile not found' })
  update(@Param('id') id: string, @Body() dto: UpdateHospitalProfileDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a hospital profile' })
  @ApiOkResponse({ description: 'Hospital profile removed successfully' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
