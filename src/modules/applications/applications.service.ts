import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../../database/entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationStatus } from '../../database/entities/enums';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly repo: Repository<Application>,
  ) {}

  findAll() {
    return this.repo.find({ 
      relations: ['job', 'candidate', 'candidateProfile'] 
    });
  }

  findOne(id: string) {
    return this.repo.findOne({ 
      where: { id }, 
      relations: ['job', 'candidate', 'candidateProfile'] 
    });
  }

  findByCandidate(candidateId: string) {
    return this.repo.find({ 
      where: { candidateId },
      relations: ['job', 'candidateProfile'] 
    });
  }

  findByJob(jobId: string) {
    return this.repo.find({ 
      where: { jobId },
      relations: ['candidate', 'candidateProfile'] 
    });
  }

  async create(dto: CreateApplicationDto) {
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
