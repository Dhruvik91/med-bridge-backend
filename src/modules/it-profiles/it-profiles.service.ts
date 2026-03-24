import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITProfile } from '../../database/entities/it-profile.entity';
import { CreateITProfileDto } from './dto/create-it-profile.dto';
import { UpdateITProfileDto } from './dto/update-it-profile.dto';

@Injectable()
export class ITProfilesService {
  private readonly logger = new Logger(ITProfilesService.name);

  constructor(
    @InjectRepository(ITProfile)
    private readonly repo: Repository<ITProfile>,
  ) {}

  async findAll(): Promise<ITProfile[]> {
    return await this.repo.find({ relations: ['candidateRole'] });
  }

  async findByCandidateRole(candidateRoleId: string): Promise<ITProfile | null> {
    return await this.repo.findOne({ where: { candidateRoleId }, relations: ['candidateRole'] });
  }

  async findOne(id: string): Promise<ITProfile> {
    const profile = await this.repo.findOne({ where: { id }, relations: ['candidateRole'] });
    if (!profile) throw new NotFoundException('IT profile not found');
    return profile;
  }

  async create(dto: CreateITProfileDto): Promise<ITProfile> {
    this.logger.log(`Creating IT profile for candidate role: ${dto.candidateRoleId}`);
    return await this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateITProfileDto): Promise<ITProfile> {
    const existing = await this.findOne(id);
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string): Promise<void> {
    await this.repo.remove(await this.findOne(id));
  }
}
