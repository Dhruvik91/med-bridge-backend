import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobNote } from '../../database/entities/job-note.entity';
import { CreateJobNoteDto } from './dto/create-job-note.dto';
import { UpdateJobNoteDto } from './dto/update-job-note.dto';

@Injectable()
export class JobNotesService {
  constructor(
    @InjectRepository(JobNote)
    private readonly repo: Repository<JobNote>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['job', 'application', 'creator'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ 
      where: { id }, 
      relations: ['job', 'application', 'creator'] 
    });
  }

  findByJob(jobId: string) {
    return this.repo.find({ 
      where: { jobId },
      relations: ['creator'] 
    });
  }

  findByApplication(applicationId: string) {
    return this.repo.find({ 
      where: { applicationId },
      relations: ['creator'] 
    });
  }

  async create(dto: CreateJobNoteDto) {
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }

  async update(id: string, dto: UpdateJobNoteDto) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Job note not found');
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Job note not found');
    await this.repo.remove(existing);
  }
}
