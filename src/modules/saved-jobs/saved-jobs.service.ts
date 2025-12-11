import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavedJob } from '../../database/entities/saved-job.entity';
import { CreateSavedJobDto } from './dto/create-saved-job.dto';

@Injectable()
export class SavedJobsService {
  constructor(
    @InjectRepository(SavedJob)
    private readonly repo: Repository<SavedJob>,
  ) {}

  async findByUser(userId: string, page = 1, limit = 50) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [items, total] = await this.repo.findAndCount({ 
      where: { userId },
      relations: ['job', 'user'],
      take,
      skip,
    });
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
