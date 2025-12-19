import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../../database/entities/job.entity';
import { Specialty } from '../../database/entities/specialty.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly repo: Repository<Job>,
    @InjectRepository(Specialty)
    private readonly specialtyRepo: Repository<Specialty>,
  ) { }

  async findAll(page = 1, limit = 20) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [items, total] = await this.repo.findAndCount({
      relations: ['employerProfile', 'organization', 'location', 'postedBy', 'applications', 'specialties'],
      take,
      skip,
    });
    return { items, total, page, limit };
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['employerProfile', 'organization', 'location', 'postedBy', 'applications', 'specialties']
    });
  }

  async findByEmployer(employerProfileId: string, page = 1, limit = 20) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [items, total] = await this.repo.findAndCount({
      where: { employerProfileId },
      relations: ['organization', 'location', 'specialties'],
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
      relations: ['employerProfile', 'location', 'specialties'],
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
      relations: ['employerProfile', 'organization', 'specialties'],
      take,
      skip,
    });
    return { items, total, page, limit };
  }

  async create(dto: CreateJobDto) {
    const { specialtyIds, ...jobData } = dto;
    const entity = this.repo.create(jobData);

    if (specialtyIds && specialtyIds.length > 0) {
      entity.specialties = await this.specialtyRepo.findByIds(specialtyIds);
    }

    return await this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJobDto) {
    const existing = await this.repo.findOne({
      where: { id },
      relations: ['specialties']
    });
    if (!existing) throw new NotFoundException('Job not found');

    const { specialtyIds, ...jobData } = dto;
    Object.assign(existing, jobData);

    if (specialtyIds !== undefined) {
      if (specialtyIds.length > 0) {
        existing.specialties = await this.specialtyRepo.findByIds(specialtyIds);
      } else {
        existing.specialties = [];
      }
    }

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
