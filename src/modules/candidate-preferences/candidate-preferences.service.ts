import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CandidatePreference } from '../../database/entities/candidate-preference.entity';
import { CreateCandidatePreferenceDto } from './dto/create-candidate-preference.dto';
import { UpdateCandidatePreferenceDto } from './dto/update-candidate-preference.dto';

@Injectable()
export class CandidatePreferencesService {
  private readonly logger = new Logger(CandidatePreferencesService.name);

  constructor(
    @InjectRepository(CandidatePreference)
    private readonly repo: Repository<CandidatePreference>,
  ) {}

  async findAll(): Promise<CandidatePreference[]> {
    return await this.repo.find({
      relations: ['candidate'],
    });
  }

  async findByCandidate(candidateId: string): Promise<CandidatePreference | null> {
    return await this.repo.findOne({
      where: { candidateId },
      relations: ['candidate'],
    });
  }

  async findOne(id: string): Promise<CandidatePreference> {
    const preference = await this.repo.findOne({
      where: { id },
      relations: ['candidate'],
    });

    if (!preference) {
      throw new NotFoundException('Candidate preference not found');
    }

    return preference;
  }

  async create(dto: CreateCandidatePreferenceDto): Promise<CandidatePreference> {
    this.logger.log(`Creating preference for candidate: ${dto.candidateId}`);
    const preference = this.repo.create(dto);
    return await this.repo.save(preference);
  }

  async update(id: string, dto: UpdateCandidatePreferenceDto): Promise<CandidatePreference> {
    const existing = await this.findOne(id);
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async updateByCandidate(candidateId: string, dto: UpdateCandidatePreferenceDto): Promise<CandidatePreference> {
    const existing = await this.findByCandidate(candidateId);
    
    if (!existing) {
      return this.create({ candidateId, ...dto });
    }

    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string): Promise<void> {
    const existing = await this.findOne(id);
    await this.repo.remove(existing);
  }
}
