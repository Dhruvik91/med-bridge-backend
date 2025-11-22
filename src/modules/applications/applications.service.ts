import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../../database/entities/application.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly repo: Repository<Application>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['job', 'doctor'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['job', 'doctor'] });
  }

  findByDoctor(doctorId: string) {
    return this.repo.find({ where: { doctorId } });
  }

  findByJob(jobId: string) {
    return this.repo.find({ where: { jobId } });
  }

  async create(dto: Partial<Application>) {
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }

  async update(id: string, dto: Partial<Application>) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Application not found');
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string) {
    await this.repo.delete(id);
  }
}
