import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CandidateProfile } from '../../database/entities/candidate-profile.entity';
import { CreateCandidateProfileDto } from './dto/create-candidate-profile.dto';
import { UpdateCandidateProfileDto } from './dto/update-candidate-profile.dto';
import { PageOptionsDto } from '../../core/dto/page-options.dto';
import { PageDto } from '../../core/dto/page.dto';
import { PageMetaDto } from '../../core/dto/page-meta.dto';
import { ClinicalProfile } from '../../database/entities/clinical-profile.entity';
import { CreateClinicalProfileDto } from './dto/create-clinical-profile.dto';

@Injectable()
export class CandidateProfilesService {
  constructor(
    @InjectRepository(CandidateProfile)
    private readonly candidateRepo: Repository<CandidateProfile>,
    @InjectRepository(ClinicalProfile)
    private readonly clinicalRepo: Repository<ClinicalProfile>,
  ) {}

  async create(userId: string, dto: CreateCandidateProfileDto): Promise<CandidateProfile> {
    const profile = this.candidateRepo.create({
      ...dto,
      userId,
      dob: dto.dob ? new Date(dto.dob) : undefined,
    } as DeepPartial<CandidateProfile>);
    return await this.candidateRepo.save(profile);
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<CandidateProfile>> {
    const queryBuilder = this.candidateRepo.createQueryBuilder('candidate');

    if (pageOptionsDto.q) {
      queryBuilder.where('candidate.fullName ILIKE :q', { q: `%${pageOptionsDto.q}%` });
    }

    queryBuilder
      .orderBy('candidate.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const [entities, itemCount] = await queryBuilder.getManyAndCount();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string): Promise<CandidateProfile> {
    const profile = await this.candidateRepo.findOne({
      where: { id },
      relations: ['user', 'location', 'candidateRoles', 'candidateRoles.jobRole'],
    });
    if (!profile) {
      throw new NotFoundException(`Candidate profile with ID ${id} not found`);
    }
    return profile;
  }

  async findByUserId(userId: string): Promise<CandidateProfile | null> {
    return this.candidateRepo.findOne({ where: { userId } });
  }

  async update(id: string, dto: UpdateCandidateProfileDto): Promise<CandidateProfile> {
    const profile = await this.findOne(id);
    const updateData = {
      ...dto,
      dob: dto.dob ? new Date(dto.dob) : profile.dob,
    };
    this.candidateRepo.merge(profile, updateData as any);
    return await this.candidateRepo.save(profile);
  }

  async remove(id: string): Promise<void> {
    const profile = await this.findOne(id);
    await this.candidateRepo.softRemove(profile);
  }

  // Clinical Profile Extension
  async createClinicalProfile(dto: CreateClinicalProfileDto): Promise<ClinicalProfile> {
    const clinical = this.clinicalRepo.create(dto);
    return this.clinicalRepo.save(clinical);
  }

  async getClinicalProfile(candidateRoleId: string): Promise<ClinicalProfile> {
    const profile = await this.clinicalRepo.findOne({ where: { candidateRoleId } });
    if (!profile) throw new NotFoundException('Clinical profile not found');
    return profile;
  }
}
