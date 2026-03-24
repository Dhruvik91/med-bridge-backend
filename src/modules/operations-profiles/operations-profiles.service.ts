import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperationsProfile } from '../../database/entities/operations-profile.entity';
import { CreateOperationsProfileDto } from './dto/create-operations-profile.dto';
import { UpdateOperationsProfileDto } from './dto/update-operations-profile.dto';

@Injectable()
export class OperationsProfilesService {
  private readonly logger = new Logger(OperationsProfilesService.name);

  constructor(
    @InjectRepository(OperationsProfile)
    private readonly repo: Repository<OperationsProfile>,
  ) {}

  async findAll(): Promise<OperationsProfile[]> {
    return await this.repo.find({ relations: ['candidateRole'] });
  }

  async findByCandidateRole(candidateRoleId: string): Promise<OperationsProfile | null> {
    return await this.repo.findOne({ where: { candidateRoleId }, relations: ['candidateRole'] });
  }

  async findOne(id: string): Promise<OperationsProfile> {
    const profile = await this.repo.findOne({ where: { id }, relations: ['candidateRole'] });
    if (!profile) throw new NotFoundException('Operations profile not found');
    return profile;
  }

  async create(dto: CreateOperationsProfileDto): Promise<OperationsProfile> {
    this.logger.log(`Creating operations profile for candidate role: ${dto.candidateRoleId}`);
    return await this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateOperationsProfileDto): Promise<OperationsProfile> {
    const existing = await this.findOne(id);
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string): Promise<void> {
    await this.repo.softRemove(await this.findOne(id));
  }
}
