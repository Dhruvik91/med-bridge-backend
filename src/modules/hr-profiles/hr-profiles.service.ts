import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HRProfile } from '../../database/entities/hr-profile.entity';
import { CreateHRProfileDto } from './dto/create-hr-profile.dto';
import { UpdateHRProfileDto } from './dto/update-hr-profile.dto';

@Injectable()
export class HRProfilesService {
  private readonly logger = new Logger(HRProfilesService.name);

  constructor(
    @InjectRepository(HRProfile)
    private readonly repo: Repository<HRProfile>,
  ) {}

  async findAll(): Promise<HRProfile[]> {
    return await this.repo.find({ relations: ['candidateRole'] });
  }

  async findByCandidateRole(candidateRoleId: string): Promise<HRProfile | null> {
    return await this.repo.findOne({
      where: { candidateRoleId },
      relations: ['candidateRole'],
    });
  }

  async findOne(id: string): Promise<HRProfile> {
    const profile = await this.repo.findOne({
      where: { id },
      relations: ['candidateRole'],
    });

    if (!profile) {
      throw new NotFoundException('HR profile not found');
    }

    return profile;
  }

  async create(dto: CreateHRProfileDto): Promise<HRProfile> {
    this.logger.log(`Creating HR profile for candidate role: ${dto.candidateRoleId}`);
    const profile = this.repo.create(dto);
    return await this.repo.save(profile);
  }

  async update(id: string, dto: UpdateHRProfileDto): Promise<HRProfile> {
    const existing = await this.findOne(id);
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string): Promise<void> {
    const existing = await this.findOne(id);
    await this.repo.softRemove(existing);
  }
}
