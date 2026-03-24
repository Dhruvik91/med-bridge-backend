import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketingProfile } from '../../database/entities/marketing-profile.entity';
import { CreateMarketingProfileDto } from './dto/create-marketing-profile.dto';
import { UpdateMarketingProfileDto } from './dto/update-marketing-profile.dto';

@Injectable()
export class MarketingProfilesService {
  private readonly logger = new Logger(MarketingProfilesService.name);

  constructor(
    @InjectRepository(MarketingProfile)
    private readonly repo: Repository<MarketingProfile>,
  ) {}

  async findAll(): Promise<MarketingProfile[]> {
    return await this.repo.find({ relations: ['candidateRole'] });
  }

  async findByCandidateRole(candidateRoleId: string): Promise<MarketingProfile | null> {
    return await this.repo.findOne({ where: { candidateRoleId }, relations: ['candidateRole'] });
  }

  async findOne(id: string): Promise<MarketingProfile> {
    const profile = await this.repo.findOne({ where: { id }, relations: ['candidateRole'] });
    if (!profile) throw new NotFoundException('Marketing profile not found');
    return profile;
  }

  async create(dto: CreateMarketingProfileDto): Promise<MarketingProfile> {
    this.logger.log(`Creating marketing profile for candidate role: ${dto.candidateRoleId}`);
    return await this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateMarketingProfileDto): Promise<MarketingProfile> {
    const existing = await this.findOne(id);
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string): Promise<void> {
    await this.repo.softRemove(await this.findOne(id));
  }
}
