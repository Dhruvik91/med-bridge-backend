import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobRole } from '../../database/entities/job-role.entity';
import { CreateJobRoleDto } from './dto/create-job-role.dto';
import { UpdateJobRoleDto } from './dto/update-job-role.dto';
import { JobRoleQueryDto } from './dto/job-role-query.dto';
import { PageDto } from '../../core/dto/page.dto';
import { PageMetaDto } from '../../core/dto/page-meta.dto';

@Injectable()
export class JobRolesService {
  constructor(
    @InjectRepository(JobRole)
    private readonly jobRoleRepository: Repository<JobRole>,
  ) {}

  async create(createJobRoleDto: CreateJobRoleDto): Promise<JobRole> {
    const jobRole = this.jobRoleRepository.create(createJobRoleDto);
    return this.jobRoleRepository.save(jobRole);
  }

  async findAll(queryDto: JobRoleQueryDto): Promise<PageDto<JobRole>> {
    const queryBuilder = this.jobRoleRepository.createQueryBuilder('jobRole');

    if (queryDto.pillarId) {
      queryBuilder.andWhere('jobRole.pillarId = :pillarId', { pillarId: queryDto.pillarId });
    }

    if (queryDto.q) {
      queryBuilder.andWhere('jobRole.name ILIKE :q', { q: `%${queryDto.q}%` });
    }

    queryBuilder
      .orderBy('jobRole.name', queryDto.order)
      .skip(queryDto.skip)
      .take(queryDto.take);

    const [entities, itemCount] = await queryBuilder.getManyAndCount();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryDto });
    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string): Promise<JobRole> {
    const jobRole = await this.jobRoleRepository.findOne({ 
      where: { id },
      relations: ['pillar'] 
    });
    if (!jobRole) {
      throw new NotFoundException(`Job Role with ID ${id} not found`);
    }
    return jobRole;
  }

  async update(id: string, updateJobRoleDto: UpdateJobRoleDto): Promise<JobRole> {
    const jobRole = await this.findOne(id);
    this.jobRoleRepository.merge(jobRole, updateJobRoleDto);
    return this.jobRoleRepository.save(jobRole);
  }

  async remove(id: string): Promise<void> {
    const jobRole = await this.findOne(id);
    await this.jobRoleRepository.remove(jobRole);
  }
}
