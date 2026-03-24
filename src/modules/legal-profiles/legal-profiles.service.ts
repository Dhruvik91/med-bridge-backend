import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LegalProfile } from '../../database/entities/legal-profile.entity';
import { CreateLegalProfileDto } from './dto/create-legal-profile.dto';
import { UpdateLegalProfileDto } from './dto/update-legal-profile.dto';

@Injectable()
export class LegalProfilesService {
  private readonly logger = new Logger(LegalProfilesService.name);

  constructor(
    @InjectRepository(LegalProfile)
    private readonly repo: Repository<LegalProfile>,
  ) {}

  async findAll(): Promise<LegalProfile[]> {
    return await this.repo.find({ relations: ['candidateRole'] });
  }

  async findByCandidateRole(candidateRoleId: string): Promise<LegalProfile | null> {
    return await this.repo.findOne({ where: { candidateRoleId }, relations: ['candidateRole'] });
  }

  async findOne(id: string): Promise<LegalProfile> {
    const profile = await this.repo.findOne({ where: { id }, relations: ['candidateRole'] });
    if (!profile) throw new NotFoundException('Legal profile not found');
    return profile;
  }

  async create(dto: CreateLegalProfileDto): Promise<LegalProfile> {
    this.logger.log(`Creating legal profile for candidate role: ${dto.candidateRoleId}`);
    return await this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateLegalProfileDto): Promise<LegalProfile> {
    const existing = await this.findOne(id);
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string): Promise<void> {
    await this.repo.remove(await this.findOne(id));
  }
}
