import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../../database/entities/job.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly repo: Repository<Job>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['hospital'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['hospital'] });
  }

  findByHospital(hospitalId: string) {
    return this.repo.find({ where: { hospitalId } });
  }

  async create(dto: Partial<Job>) {
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }

  async update(id: string, dto: Partial<Job>) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Job not found');
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string) {
    await this.repo.delete(id);
  }
}
