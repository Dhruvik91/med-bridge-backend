import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavedJob } from '../../database/entities/saved-job.entity';
import { CreateSavedJobDto } from './dto/create-saved-job.dto';
import { GetSavedJobsQueryDto } from './dto/get-saved-jobs-query.dto';

@Injectable()
export class SavedJobsService {
  constructor(
    @InjectRepository(SavedJob)
    private readonly repo: Repository<SavedJob>,
  ) {}

  async findByUser(userId: string, query: GetSavedJobsQueryDto) {
    const {
      page = 1,
      limit = 50,
      q,
      location,
      jobType,
      salaryMin,
      salaryMax,
      experienceMin,
      experienceMax,
      specialtyIds,
      postedWithin,
    } = query;

    const take = limit;
    const skip = (page - 1) * limit;

    const qb = this.repo.createQueryBuilder('savedJob')
      .leftJoinAndSelect('savedJob.job', 'job')
      .leftJoinAndSelect('savedJob.user', 'user')
      .leftJoinAndSelect('job.location', 'location')
      .leftJoinAndSelect('job.specialties', 'specialties')
      .where('savedJob.userId = :userId', { userId });

    if (q) {
      qb.andWhere(
        '(LOWER(job.title) LIKE LOWER(:q) OR LOWER(job.description) LIKE LOWER(:q) OR EXISTS (SELECT 1 FROM job_specialties js JOIN specialties s ON js.specialty_id = s.id WHERE js.job_id = job.id AND LOWER(s.name) LIKE LOWER(:q)))',
        { q: `%${q}%` },
      );
    }

    if (location) {
      qb.andWhere(
        '(LOWER(location.city) LIKE LOWER(:loc) OR LOWER(location.state) LIKE LOWER(:loc) OR LOWER(location.country) LIKE LOWER(:loc))',
        { loc: `%${location}%` },
      );
    }

    if (jobType) {
      qb.andWhere('job.jobType = :jobType', { jobType });
    }

    if (salaryMin !== undefined) {
      qb.andWhere('job.salaryMin >= :salaryMin', { salaryMin });
    }

    if (salaryMax !== undefined) {
      qb.andWhere('job.salaryMax <= :salaryMax', { salaryMax });
    }

    if (experienceMin !== undefined) {
      qb.andWhere('job.experienceMin >= :experienceMin', { experienceMin });
    }

    if (experienceMax !== undefined) {
      qb.andWhere('job.experienceMax <= :experienceMax', { experienceMax });
    }

    if (specialtyIds && specialtyIds.length > 0) {
      qb.andWhere('specialties.id IN (:...specialtyIds)', { specialtyIds });
    }

    if (postedWithin) {
      const now = new Date();
      let dateLimit: Date | undefined;
      if (postedWithin === '24h') {
        dateLimit = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      } else if (postedWithin === '7d') {
        dateLimit = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else if (postedWithin === '30d') {
        dateLimit = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }
      if (dateLimit) {
        qb.andWhere('job.publishedAt >= :dateLimit', { dateLimit });
      }
    }

    const [items, total] = await qb
      .take(take)
      .skip(skip)
      .orderBy('job.publishedAt', 'DESC')
      .getManyAndCount();

    return { items, total, page, limit };
  }

  async findOne(userId: string, jobId: string) {
    return this.repo.findOne({ 
      where: { userId, jobId },
      relations: ['job'] 
    });
  }

  async save(dto: CreateSavedJobDto) {
    const existing = await this.repo.findOne({ 
      where: { userId: dto.userId, jobId: dto.jobId } 
    });
    if (existing) throw new ConflictException('Job already saved');
    
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }

  async unsave(userId: string, jobId: string) {
    const existing = await this.repo.findOne({ where: { userId, jobId } });
    if (!existing) throw new NotFoundException('Saved job not found');
    await this.repo.remove(existing);
  }
}
