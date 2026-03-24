import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QualityProfile } from '../../database/entities/quality-profile.entity';
import { CreateQualityProfileDto } from './dto/create-quality-profile.dto';
import { UpdateQualityProfileDto } from './dto/update-quality-profile.dto';

@Injectable()
export class QualityProfilesService {
  private readonly logger = new Logger(QualityProfilesService.name);

  constructor(
    @InjectRepository(QualityProfile)
    private readonly repo: Repository<QualityProfile>,
  ) {}

  async findAll(): Promise<QualityProfile[]> {
    return await this.repo.find({ relations: ['candidateRole'] });
  }

  async findByCandidateRole(candidateRoleId: string): Promise<QualityProfile | null> {
    return await this.repo.findOne({ where: { candidateRoleId }, relations: ['candidateRole'] });
  }

  async findOne(id: string): Promise<QualityProfile> {
    const profile = await this.repo.findOne({ where: { id }, relations: ['candidateRole'] });
    if (!profile) throw new NotFoundException('Quality profile not found');
    return profile;
  }

  async create(dto: CreateQualityProfileDto): Promise<QualityProfile> {
    this.logger.log(`Creating quality profile for candidate role: ${dto.candidateRoleId}`);
    return await this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateQualityProfileDto): Promise<QualityProfile> {
    const existing = await this.findOne(id);
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string): Promise<void> {
    await this.repo.softRemove(await this.findOne(id));
  }
}
