import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../../database/entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly repo: Repository<Job>,
  ) {}

  findAll() {
    return this.repo.find({ 
      relations: ['employerProfile', 'organization', 'location', 'postedBy', 'applications'] 
    });
  }

  findOne(id: string) {
    return this.repo.findOne({ 
      where: { id }, 
      relations: ['employerProfile', 'organization', 'location', 'postedBy', 'applications'] 
    });
  }

  findByEmployer(employerProfileId: string) {
    return this.repo.find({ 
      where: { employerProfileId },
      relations: ['organization', 'location'] 
    });
  }

  findByOrganization(organizationId: string) {
    return this.repo.find({ 
      where: { organizationId },
      relations: ['employerProfile', 'location'] 
    });
  }

  findByLocation(locationId: string) {
    return this.repo.find({ 
      where: { locationId },
      relations: ['employerProfile', 'organization'] 
    });
  }

  async create(dto: CreateJobDto) {
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJobDto) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Job not found');
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Job not found');
    await this.repo.softRemove(existing);
  }

  async incrementViews(id: string) {
    await this.repo.increment({ id }, 'viewsCount', 1);
  }

  async incrementFavorites(id: string) {
    await this.repo.increment({ id }, 'favoritesCount', 1);
  }

  async decrementFavorites(id: string) {
    await this.repo.decrement({ id }, 'favoritesCount', 1);
  }
}
