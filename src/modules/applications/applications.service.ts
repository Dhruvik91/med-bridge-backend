import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../../database/entities/application.entity';
import { Job } from '../../database/entities/job.entity';
import { User } from '../../database/entities/user.entity';
import { DoctorProfile } from '../../database/entities/doctor-profile.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationStatus } from '../../database/entities/enums';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly repo: Repository<Application>,
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(DoctorProfile)
    private readonly doctorProfileRepo: Repository<DoctorProfile>,
  ) { }

  async findAll(page = 1, limit = 20) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [items, total] = await this.repo.findAndCount({
      relations: ['job', 'candidate', 'candidateProfile'],
      take,
      skip,
    });
    return { items, total, page, limit };
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['job', 'candidate', 'candidateProfile']
    });
  }

  async findByCandidate(candidateId: string, page = 1, limit = 20) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [items, total] = await this.repo.findAndCount({
      where: { candidateId },
      relations: ['job', 'candidateProfile'],
      take,
      skip,
    });
    return { items, total, page, limit };
  }

  async findByJob(jobId: string, page = 1, limit = 20) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [items, total] = await this.repo.findAndCount({
      where: { jobId },
      relations: ['candidate', 'candidateProfile'],
      take,
      skip,
    });
    return { items, total, page, limit };
  }

  async create(dto: CreateApplicationDto) {
    const job = await this.jobRepo.findOne({ where: { id: dto.jobId } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${dto.jobId} not found`);
    }

    const candidate = await this.userRepo.findOne({ where: { id: dto.candidateId } });
    if (!candidate) {
      throw new NotFoundException(`Candidate with ID ${dto.candidateId} not found`);
    }

    if (dto.candidateProfileId) {
      const profile = await this.doctorProfileRepo.findOne({ where: { id: dto.candidateProfileId } });
      if (!profile) {
        throw new NotFoundException(`Doctor Profile with ID ${dto.candidateProfileId} not found`);
      }
    } else {
      // Auto-link profile if not provided
      const profile = await this.doctorProfileRepo.findOne({ where: { userId: dto.candidateId } });
      if (profile) {
        dto.candidateProfileId = profile.id;
      }
    }

    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }

  async update(id: string, dto: UpdateApplicationDto) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Application not found');
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async updateStatus(id: string, status: ApplicationStatus, note?: string) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Application not found');

    // Add to status history
    const historyEntry = {
      status,
      changedAt: new Date().toISOString(),
      note,
    };
    existing.statusHistory = [...existing.statusHistory, historyEntry];
    existing.status = status;

    return await this.repo.save(existing);
  }

  async withdraw(id: string) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Application not found');
    existing.status = ApplicationStatus.withdrawn;
    existing.withdrawnAt = new Date();
    return await this.repo.save(existing);
  }

  async archive(id: string) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Application not found');
    existing.archived = true;
    return await this.repo.save(existing);
  }

  async remove(id: string) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Application not found');
    await this.repo.remove(existing);
  }
}
