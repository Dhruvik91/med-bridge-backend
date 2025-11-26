import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployerProfile } from '../../database/entities/employer-profile.entity';
import { CreateEmployerProfileDto } from './dto/create-employer-profile.dto';
import { UpdateEmployerProfileDto } from './dto/update-employer-profile.dto';

@Injectable()
export class EmployerProfileService {
  constructor(
    @InjectRepository(EmployerProfile)
    private readonly repo: Repository<EmployerProfile>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['user', 'organizations'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ 
      where: { id }, 
      relations: ['user', 'organizations', 'jobs'] 
    });
  }

  async findByUser(userId: string) {
    return this.repo.findOne({ 
      where: { userId },
      relations: ['organizations'] 
    });
  }

  async create(dto: CreateEmployerProfileDto) {
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }

  async update(id: string, dto: UpdateEmployerProfileDto) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Employer profile not found');
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Employer profile not found');
    await this.repo.softRemove(existing);
  }
}
