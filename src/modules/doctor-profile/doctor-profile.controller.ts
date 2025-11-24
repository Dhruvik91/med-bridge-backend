import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { DoctorProfileService } from './doctor-profile.service';
import { DoctorProfile } from '../../database/entities/doctor-profile.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';

@ApiTags('Doctor Profiles')
@ApiBearerAuth()
@Controller('doctor-profiles')
export class DoctorProfileController {
  constructor(private readonly service: DoctorProfileService) {}

  @Get()
  @ApiOperation({ summary: 'List all doctor profiles' })
  @ApiOkResponse({ type: DoctorProfile, isArray: true })
  findAll(): Promise<DoctorProfile[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get doctor profile by ID' })
  @ApiOkResponse({ type: DoctorProfile })
  @ApiNotFoundResponse({ description: 'Doctor profile not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get doctor profile by user ID' })
  @ApiOkResponse({ type: DoctorProfile })
  findByUser(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a doctor profile' })
  @ApiCreatedResponse({ type: DoctorProfile })
  create(@Body() dto: CreateDoctorProfileDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a doctor profile' })
  @ApiOkResponse({ type: DoctorProfile })
  @ApiNotFoundResponse({ description: 'Doctor profile not found' })
  update(@Param('id') id: string, @Body() dto: UpdateDoctorProfileDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a doctor profile' })
  @ApiOkResponse({ description: 'Doctor profile removed successfully' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
