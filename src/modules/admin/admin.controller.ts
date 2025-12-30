import { Controller, Get, Param, Patch, Delete, Query, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { User } from '../../database/entities/user.entity';
import { DoctorProfile } from '../../database/entities/doctor-profile.entity';
import { EmployerProfile } from '../../database/entities/employer-profile.entity';
import { Job } from '../../database/entities/job.entity';
import { Application } from '../../database/entities/application.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import {
  ApiOkResponseEnvelope,
  EmptyResponseDto,
} from '../../core/swagger/response-envelope';
import { AdminUsersQueryDto, AdminJobsQueryDto, AdminApplicationsQueryDto } from './dto/admin-query.dto';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get admin dashboard statistics' })
  @ApiOkResponseEnvelope(Object)
  getStats() {
    return this.service.getStats();
  }

  @Get('users')
  @ApiOperation({ summary: 'List all users (admin)' })
  @ApiOkResponseEnvelope(User, true)
  findAllUsers(@Query() query: AdminUsersQueryDto) {
    return this.service.findAllUsers(query);
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get user by ID (admin)' })
  @ApiOkResponseEnvelope(User)
  @ApiNotFoundResponse({ description: 'User not found' })
  findUserById(@Param('id') id: string) {
    return this.service.findUserById(id);
  }

  @Patch('users/:id')
  @ApiOperation({ summary: 'Update user (admin)' })
  @ApiOkResponseEnvelope(User)
  @ApiNotFoundResponse({ description: 'User not found' })
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserAdminDto) {
    return this.service.updateUser(id, dto);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete user (admin)' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  deleteUser(@Param('id') id: string) {
    return this.service.deleteUser(id);
  }

  @Get('candidates')
  @ApiOperation({ summary: 'List all candidates (admin)' })
  @ApiOkResponseEnvelope(DoctorProfile, true)
  findAllCandidates(@Query() query: AdminUsersQueryDto) {
    return this.service.findAllCandidates(query);
  }

  @Get('candidates/:id')
  @ApiOperation({ summary: 'Get candidate by ID (admin)' })
  @ApiOkResponseEnvelope(DoctorProfile)
  @ApiNotFoundResponse({ description: 'Candidate not found' })
  findCandidateById(@Param('id') id: string) {
    return this.service.findCandidateById(id);
  }

  @Delete('candidates/:id')
  @ApiOperation({ summary: 'Delete candidate (admin)' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  deleteCandidate(@Param('id') id: string) {
    return this.service.deleteCandidate(id);
  }

  @Get('employers')
  @ApiOperation({ summary: 'List all employers (admin)' })
  @ApiOkResponseEnvelope(EmployerProfile, true)
  findAllEmployers(@Query() query: AdminUsersQueryDto) {
    return this.service.findAllEmployers(query);
  }

  @Get('employers/:id')
  @ApiOperation({ summary: 'Get employer by ID (admin)' })
  @ApiOkResponseEnvelope(EmployerProfile)
  @ApiNotFoundResponse({ description: 'Employer not found' })
  findEmployerById(@Param('id') id: string) {
    return this.service.findEmployerById(id);
  }

  @Delete('employers/:id')
  @ApiOperation({ summary: 'Delete employer (admin)' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  deleteEmployer(@Param('id') id: string) {
    return this.service.deleteEmployer(id);
  }

  @Get('jobs')
  @ApiOperation({ summary: 'List all jobs (admin)' })
  @ApiOkResponseEnvelope(Job, true)
  findAllJobs(@Query() query: AdminJobsQueryDto) {
    return this.service.findAllJobs(query);
  }

  @Get('jobs/:id')
  @ApiOperation({ summary: 'Get job by ID (admin)' })
  @ApiOkResponseEnvelope(Job)
  @ApiNotFoundResponse({ description: 'Job not found' })
  findJobById(@Param('id') id: string) {
    return this.service.findJobById(id);
  }

  @Delete('jobs/:id')
  @ApiOperation({ summary: 'Delete job (admin)' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  deleteJob(@Param('id') id: string) {
    return this.service.deleteJob(id);
  }

  @Get('applications')
  @ApiOperation({ summary: 'List all applications (admin)' })
  @ApiOkResponseEnvelope(Application, true)
  findAllApplications(@Query() query: AdminApplicationsQueryDto) {
    return this.service.findAllApplications(query);
  }

  @Get('applications/:id')
  @ApiOperation({ summary: 'Get application by ID (admin)' })
  @ApiOkResponseEnvelope(Application)
  @ApiNotFoundResponse({ description: 'Application not found' })
  findApplicationById(@Param('id') id: string) {
    return this.service.findApplicationById(id);
  }

  @Delete('applications/:id')
  @ApiOperation({ summary: 'Delete application (admin)' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  deleteApplication(@Param('id') id: string) {
    return this.service.deleteApplication(id);
  }
}
