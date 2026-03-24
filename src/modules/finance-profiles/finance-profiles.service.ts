import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinanceProfile } from '../../database/entities/finance-profile.entity';
import { CreateFinanceProfileDto } from './dto/create-finance-profile.dto';
import { UpdateFinanceProfileDto } from './dto/update-finance-profile.dto';

@Injectable()
export class FinanceProfilesService {
  private readonly logger = new Logger(FinanceProfilesService.name);

  constructor(
    @InjectRepository(FinanceProfile)
    private readonly repo: Repository<FinanceProfile>,
  ) {}

  async findAll(): Promise<FinanceProfile[]> {
    return await this.repo.find({ relations: ['candidateRole'] });
  }

  async findByCandidateRole(candidateRoleId: string): Promise<FinanceProfile | null> {
    return await this.repo.findOne({ where: { candidateRoleId }, relations: ['candidateRole'] });
  }

  async findOne(id: string): Promise<FinanceProfile> {
    const profile = await this.repo.findOne({ where: { id }, relations: ['candidateRole'] });
    if (!profile) throw new NotFoundException('Finance profile not found');
    return profile;
  }

  async create(dto: CreateFinanceProfileDto): Promise<FinanceProfile> {
    this.logger.log(`Creating finance profile for candidate role: ${dto.candidateRoleId}`);
    return await this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateFinanceProfileDto): Promise<FinanceProfile> {
    const existing = await this.findOne(id);
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string): Promise<void> {
    await this.repo.remove(await this.findOne(id));
  }
}
