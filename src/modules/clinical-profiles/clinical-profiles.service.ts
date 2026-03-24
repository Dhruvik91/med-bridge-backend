import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicalProfile } from '../../database/entities/clinical-profile.entity';
import { CreateClinicalProfileDto } from './dto/create-clinical-profile.dto';
import { UpdateClinicalProfileDto } from './dto/update-clinical-profile.dto';

@Injectable()
export class ClinicalProfilesService {
  private readonly logger = new Logger(ClinicalProfilesService.name);

  constructor(
    @InjectRepository(ClinicalProfile)
    private readonly repo: Repository<ClinicalProfile>,
  ) {}

  async findAll(): Promise<ClinicalProfile[]> {
    return await this.repo.find({
      relations: ['candidateRole'],
    });
  }

  async findByCandidateRole(candidateRoleId: string): Promise<ClinicalProfile | null> {
    return await this.repo.findOne({
      where: { candidateRoleId },
      relations: ['candidateRole'],
    });
  }

  async findOne(id: string): Promise<ClinicalProfile> {
    const profile = await this.repo.findOne({
      where: { id },
      relations: ['candidateRole'],
    });

    if (!profile) {
      throw new NotFoundException('Clinical profile not found');
    }

    return profile;
  }

  async create(dto: CreateClinicalProfileDto): Promise<ClinicalProfile> {
    this.logger.log(`Creating clinical profile for candidate role: ${dto.candidateRoleId}`);
    const profile = this.repo.create(dto);
    return await this.repo.save(profile);
  }

  async update(id: string, dto: UpdateClinicalProfileDto): Promise<ClinicalProfile> {
    const existing = await this.findOne(id);
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string): Promise<void> {
    const existing = await this.findOne(id);
    await this.repo.remove(existing);
  }
}
