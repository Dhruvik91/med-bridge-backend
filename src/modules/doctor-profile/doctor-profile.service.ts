import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorProfile } from '../../database/entities/doctor-profile.entity';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';

@Injectable()
export class DoctorProfileService {
  constructor(
    @InjectRepository(DoctorProfile)
    private readonly repo: Repository<DoctorProfile>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['user'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['user'] });
  }

  async findByUser(userId: string) {
    return this.repo.findOne({ where: { userId } });
  }

  async create(dto: CreateDoctorProfileDto) {
    const entityData: any = { ...dto };
    
    // Convert date string to Date object if provided
    if (dto.dob) {
      entityData.dob = new Date(dto.dob);
    }
    
    const entity = this.repo.create(entityData);
    return await this.repo.save(entity);
  }

  async update(id: string, dto: UpdateDoctorProfileDto) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Doctor profile not found');
    
    const updateData: any = { ...dto };
    
    // Convert date string to Date object if provided
    if (dto.dob) {
      updateData.dob = new Date(dto.dob);
    }
    
    Object.assign(existing, updateData);
    return await this.repo.save(existing);
  }

  async remove(id: string) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Doctor profile not found');
    await this.repo.softRemove(existing);
  }
}
