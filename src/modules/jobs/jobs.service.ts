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

  async findAll(page = 1, limit = 20) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [items, total] = await this.repo.findAndCount({
      relations: ['employerProfile', 'organization', 'location', 'postedBy', 'applications'],
      take,
      skip,
    });
    return { items, total, page, limit };
  }

  findOne(id: string) {
    return this.repo.findOne({ 
      where: { id }, 
      relations: ['employerProfile', 'organization', 'location', 'postedBy', 'applications'] 
    });
  }

  async findByEmployer(employerProfileId: string, page = 1, limit = 20) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [items, total] = await this.repo.findAndCount({
      where: { employerProfileId },
      relations: ['organization', 'location'],
      take,
      skip,
    });
    return { items, total, page, limit };
  }

  async findByOrganization(organizationId: string, page = 1, limit = 20) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [items, total] = await this.repo.findAndCount({
      where: { organizationId },
      relations: ['employerProfile', 'location'],
      take,
      skip,
    });
    return { items, total, page, limit };
  }

  async findByLocation(locationId: string, page = 1, limit = 20) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [items, total] = await this.repo.findAndCount({
      where: { locationId },
      relations: ['employerProfile', 'organization'],
      take,
      skip,
    });
    return { items, total, page, limit };
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
