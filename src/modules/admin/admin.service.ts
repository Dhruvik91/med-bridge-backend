import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import { DoctorProfile } from '../../database/entities/doctor-profile.entity';
import { EmployerProfile } from '../../database/entities/employer-profile.entity';
import { Job } from '../../database/entities/job.entity';
import { Application } from '../../database/entities/application.entity';
import { AdminUsersQueryDto, AdminJobsQueryDto, AdminApplicationsQueryDto } from './dto/admin-query.dto';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';
import { UserRole, JobStatus } from '../../database/entities/enums';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(DoctorProfile)
    private readonly doctorProfileRepo: Repository<DoctorProfile>,
    @InjectRepository(EmployerProfile)
    private readonly employerProfileRepo: Repository<EmployerProfile>,
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>,
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application>,
  ) {}

  async findAllUsers(query: AdminUsersQueryDto) {
    const { page = 1, limit = 20, q, role, isActive, isVerified } = query;
    const take = limit;
    const skip = (page - 1) * limit;

    const queryBuilder = this.userRepo.createQueryBuilder('user')
      .leftJoinAndSelect('user.doctorProfile', 'doctorProfile')
      .leftJoinAndSelect('user.employerProfile', 'employerProfile');

    if (q) {
      queryBuilder.andWhere(
        '(LOWER(user.email) LIKE LOWER(:q) OR LOWER(doctorProfile.full_name) LIKE LOWER(:q) OR LOWER(employerProfile.name) LIKE LOWER(:q))',
        { q: `%${q}%` }
      );
    }

    if (role) {
      queryBuilder.andWhere('user.userType = :role', { role });
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('user.isActive = :isActive', { isActive });
    }

    if (isVerified !== undefined) {
      queryBuilder.andWhere('user.isVerified = :isVerified', { isVerified });
    }

    const [items, total] = await queryBuilder
      .take(take)
      .skip(skip)
      .orderBy('user.createdAt', 'DESC')
      .getManyAndCount();

    return { items, total, page, limit };
  }

  async findUserById(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['doctorProfile', 'employerProfile'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUser(id: string, dto: UpdateUserAdminDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, dto);
    return await this.userRepo.save(user);
  }

  async deleteUser(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    await this.userRepo.softRemove(user);
  }

  async findAllCandidates(query: AdminUsersQueryDto) {
    const { page = 1, limit = 20, q, isActive, isVerified } = query;
    const take = limit;
    const skip = (page - 1) * limit;

    const queryBuilder = this.doctorProfileRepo.createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where('user.userType IN (:...roles)', { roles: ['candidate', 'doctor'] });

    if (q) {
      queryBuilder.andWhere(
        '(LOWER(profile.full_name) LIKE LOWER(:q) OR LOWER(user.email) LIKE LOWER(:q))',
        { q: `%${q}%` }
      );
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('user.isActive = :isActive', { isActive });
    }

    if (isVerified !== undefined) {
      queryBuilder.andWhere('user.isVerified = :isVerified', { isVerified });
    }

    const [items, total] = await queryBuilder
      .take(take)
      .skip(skip)
      .orderBy('profile.createdAt', 'DESC')
      .getManyAndCount();

    return { items, total, page, limit };
  }

  async findCandidateById(id: string) {
    const profile = await this.doctorProfileRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!profile) throw new NotFoundException('Candidate profile not found');
    return profile;
  }

  async deleteCandidate(id: string) {
    const profile = await this.doctorProfileRepo.findOne({ where: { id } });
    if (!profile) throw new NotFoundException('Candidate profile not found');
    await this.doctorProfileRepo.softRemove(profile);
  }

  async findAllEmployers(query: AdminUsersQueryDto) {
    const { page = 1, limit = 20, q, isActive, isVerified } = query;
    const take = limit;
    const skip = (page - 1) * limit;

    const queryBuilder = this.employerProfileRepo.createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where('user.userType IN (:...roles)', { roles: ['employer', 'hospital'] });

    if (q) {
      queryBuilder.andWhere(
        '(LOWER(profile.name) LIKE LOWER(:q) OR LOWER(user.email) LIKE LOWER(:q))',
        { q: `%${q}%` }
      );
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('user.isActive = :isActive', { isActive });
    }

    if (isVerified !== undefined) {
      queryBuilder.andWhere('user.isVerified = :isVerified', { isVerified });
    }

    const [items, total] = await queryBuilder
      .take(take)
      .skip(skip)
      .orderBy('profile.createdAt', 'DESC')
      .getManyAndCount();

    return { items, total, page, limit };
  }

  async findEmployerById(id: string) {
    const profile = await this.employerProfileRepo.findOne({
      where: { id },
      relations: ['user', 'jobs'],
    });
    if (!profile) throw new NotFoundException('Employer profile not found');
    return profile;
  }

  async deleteEmployer(id: string) {
    const profile = await this.employerProfileRepo.findOne({ where: { id } });
    if (!profile) throw new NotFoundException('Employer profile not found');
    await this.employerProfileRepo.softRemove(profile);
  }

  async findAllJobs(query: AdminJobsQueryDto) {
    const { page = 1, limit = 20, q, status, employerProfileId } = query;
    const take = limit;
    const skip = (page - 1) * limit;

    const queryBuilder = this.jobRepo.createQueryBuilder('job')
      .leftJoinAndSelect('job.employerProfile', 'employerProfile')
      .leftJoinAndSelect('job.organization', 'organization')
      .leftJoinAndSelect('job.location', 'location')
      .leftJoinAndSelect('job.specialties', 'specialties');

    if (q) {
      queryBuilder.andWhere(
        '(LOWER(job.title) LIKE LOWER(:q) OR LOWER(job.description) LIKE LOWER(:q))',
        { q: `%${q}%` }
      );
    }

    if (status) {
      queryBuilder.andWhere('job.status = :status', { status });
    }

    if (employerProfileId) {
      queryBuilder.andWhere('job.employerProfileId = :employerProfileId', { employerProfileId });
    }

    const [items, total] = await queryBuilder
      .take(take)
      .skip(skip)
      .orderBy('job.createdAt', 'DESC')
      .getManyAndCount();

    return { items, total, page, limit };
  }

  async findJobById(id: string) {
    const job = await this.jobRepo.findOne({
      where: { id },
      relations: ['employerProfile', 'organization', 'location', 'specialties', 'applications'],
    });
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }

  async deleteJob(id: string) {
    const job = await this.jobRepo.findOne({ where: { id } });
    if (!job) throw new NotFoundException('Job not found');
    await this.jobRepo.softRemove(job);
  }

  async findAllApplications(query: AdminApplicationsQueryDto) {
    const { page = 1, limit = 20, q, status, jobId, candidateId } = query;
    const take = limit;
    const skip = (page - 1) * limit;

    const queryBuilder = this.applicationRepo.createQueryBuilder('application')
      .leftJoinAndSelect('application.job', 'job')
      .leftJoinAndSelect('application.candidate', 'candidate')
      .leftJoinAndSelect('application.candidateProfile', 'candidateProfile');

    if (q) {
      queryBuilder.andWhere(
        '(LOWER(candidateProfile.full_name) LIKE LOWER(:q) OR LOWER(job.title) LIKE LOWER(:q))',
        { q: `%${q}%` }
      );
    }

    if (status) {
      queryBuilder.andWhere('application.status = :status', { status });
    }

    if (jobId) {
      queryBuilder.andWhere('application.jobId = :jobId', { jobId });
    }

    if (candidateId) {
      queryBuilder.andWhere('application.candidateId = :candidateId', { candidateId });
    }

    const [items, total] = await queryBuilder
      .take(take)
      .skip(skip)
      .orderBy('application.createdAt', 'DESC')
      .getManyAndCount();

    return { items, total, page, limit };
  }

  async findApplicationById(id: string) {
    const application = await this.applicationRepo.findOne({
      where: { id },
      relations: ['job', 'candidate', 'candidateProfile'],
    });
    if (!application) throw new NotFoundException('Application not found');
    return application;
  }

  async deleteApplication(id: string) {
    const application = await this.applicationRepo.findOne({ where: { id } });
    if (!application) throw new NotFoundException('Application not found');
    await this.applicationRepo.remove(application);
  }

  async getStats() {
    const [totalUsers, totalCandidates, totalEmployers, totalJobs, totalApplications] = await Promise.all([
      this.userRepo.count(),
      this.userRepo.count({ where: { userType: UserRole.candidate } }),
      this.userRepo.count({ where: { userType: UserRole.employer } }),
      this.jobRepo.count(),
      this.applicationRepo.count(),
    ]);

    const [activeJobs, publishedJobs] = await Promise.all([
      this.jobRepo.count({ where: { status: JobStatus.published } }),
      this.jobRepo.count({ where: { status: JobStatus.published } }),
    ]);

    return {
      totalUsers,
      totalCandidates,
      totalEmployers,
      totalJobs,
      totalApplications,
      activeJobs,
      publishedJobs,
    };
  }
}
