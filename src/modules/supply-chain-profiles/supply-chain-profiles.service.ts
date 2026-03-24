import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplyChainProfile } from '../../database/entities/supply-chain-profile.entity';
import { CreateSupplyChainProfileDto } from './dto/create-supply-chain-profile.dto';
import { UpdateSupplyChainProfileDto } from './dto/update-supply-chain-profile.dto';

@Injectable()
export class SupplyChainProfilesService {
  private readonly logger = new Logger(SupplyChainProfilesService.name);

  constructor(
    @InjectRepository(SupplyChainProfile)
    private readonly repo: Repository<SupplyChainProfile>,
  ) {}

  async findAll(): Promise<SupplyChainProfile[]> {
    return await this.repo.find({ relations: ['candidateRole'] });
  }

  async findByCandidateRole(candidateRoleId: string): Promise<SupplyChainProfile | null> {
    return await this.repo.findOne({ where: { candidateRoleId }, relations: ['candidateRole'] });
  }

  async findOne(id: string): Promise<SupplyChainProfile> {
    const profile = await this.repo.findOne({ where: { id }, relations: ['candidateRole'] });
    if (!profile) throw new NotFoundException('Supply chain profile not found');
    return profile;
  }

  async create(dto: CreateSupplyChainProfileDto): Promise<SupplyChainProfile> {
    this.logger.log(`Creating supply chain profile for candidate role: ${dto.candidateRoleId}`);
    return await this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateSupplyChainProfileDto): Promise<SupplyChainProfile> {
    const existing = await this.findOne(id);
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string): Promise<void> {
    await this.repo.softRemove(await this.findOne(id));
  }
}
