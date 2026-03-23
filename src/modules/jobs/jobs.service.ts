import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../../database/entities/job.entity';
import { Specialty } from '../../database/entities/specialty.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { GetJobsQueryDto, PostedWithin } from './dto/get-jobs-query.dto';
import { PageMetaDto } from '../../core/dto/page-meta.dto';
import { PageDto } from '../../core/dto/page.dto';
import { Skill } from '../../database/entities/skill.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly repo: Repository<Job>,
    @InjectRepository(Specialty)
    private readonly specialtyRepo: Repository<Specialty>,
    @InjectRepository(Skill)
    private readonly skillRepo: Repository<Skill>,
  ) { }

  async findAll(query: GetJobsQueryDto): Promise<PageDto<Job>> {
    const {
      q,
      location,
      jobType,
      salaryMin,
      salaryMax,
      experienceMin,
      experienceMax,
      specialtyIds,
      postedWithin,
      pillarId,
      jobRoleId,
      order,
      skip,
      take,
    } = query;

    const queryBuilder = this.repo.createQueryBuilder('job')
      .leftJoinAndSelect('job.employerProfile', 'employerProfile')
      .leftJoinAndSelect('job.organization', 'organization')
      .leftJoinAndSelect('job.location', 'location')
      .leftJoinAndSelect('job.postedBy', 'postedBy')
      .leftJoinAndSelect('job.specialties', 'specialties')
      .leftJoinAndSelect('job.pillar', 'pillar')
      .leftJoinAndSelect('job.jobRole', 'jobRole')
      .where('job.status = :status', { status: 'published' });

    if (q) {
      queryBuilder.andWhere(
        '(LOWER(job.title) LIKE LOWER(:q) OR LOWER(job.description) LIKE LOWER(:q))',
        { q: `%${q}%` },
      );
    }

    if (location) {
      queryBuilder.andWhere(
        '(LOWER(location.city) LIKE LOWER(:loc) OR LOWER(location.state) LIKE LOWER(:loc) OR LOWER(location.country) LIKE LOWER(:loc))',
        { loc: `%${location}%` },
      );
    }

    if (jobType) {
      queryBuilder.andWhere('job.jobType = :jobType', { jobType });
    }

    if (salaryMin !== undefined) {
      queryBuilder.andWhere('job.salaryMin >= :salaryMin', { salaryMin });
    }

    if (salaryMax !== undefined) {
      queryBuilder.andWhere('job.salaryMax <= :salaryMax', { salaryMax });
    }

    if (experienceMin !== undefined) {
      queryBuilder.andWhere('job.experienceMin >= :experienceMin', { experienceMin });
    }

    if (experienceMax !== undefined) {
      queryBuilder.andWhere('job.experienceMax <= :experienceMax', { experienceMax });
    }

    if (pillarId) {
      queryBuilder.andWhere('job.pillarId = :pillarId', { pillarId });
    }

    if (jobRoleId) {
      queryBuilder.andWhere('job.jobRoleId = :jobRoleId', { jobRoleId });
    }

    if (specialtyIds && specialtyIds.length > 0) {
      queryBuilder.andWhere('specialties.id IN (:...specialtyIds)', { specialtyIds });
    }

    if (postedWithin) {
      const now = new Date();
      let dateLimit: Date | null = null;
      if (postedWithin === PostedWithin['24h']) {
        dateLimit = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      } else if (postedWithin === PostedWithin['7d']) {
        dateLimit = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else if (postedWithin === PostedWithin['30d']) {
        dateLimit = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }
      if (dateLimit) {
        queryBuilder.andWhere('job.publishedAt >= :dateLimit', { dateLimit });
      }
    }

    queryBuilder
      .orderBy('job.publishedAt', order)
      .skip(skip)
      .take(take);

    const [entities, itemCount] = await queryBuilder.getManyAndCount();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: query });
    return new PageDto(entities, pageMetaDto);
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
    const { specialtyIds, skillIds, ...jobData } = dto;
    const entity = this.repo.create(jobData);

    if (specialtyIds && specialtyIds.length > 0) {
      entity.specialties = await this.specialtyRepo.findByIds(specialtyIds);
    }

    if (skillIds && skillIds.length > 0) {
      entity.skills = await this.skillRepo.findByIds(skillIds);
    }

    return await this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJobDto) {
    const existing = await this.repo.findOne({
      where: { id },
      relations: ['specialties', 'skills']
    });
    if (!existing) throw new NotFoundException('Job not found');

    const { specialtyIds, skillIds, ...jobData } = dto;
    Object.assign(existing, jobData);

    if (specialtyIds !== undefined) {
      if (specialtyIds.length > 0) {
        existing.specialties = await this.specialtyRepo.findByIds(specialtyIds);
      } else {
        existing.specialties = [];
      }
    }

    if (skillIds !== undefined) {
      if (skillIds.length > 0) {
        existing.skills = await this.skillRepo.findByIds(skillIds);
      } else {
        existing.skills = [];
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
