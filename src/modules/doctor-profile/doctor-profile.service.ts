import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorProfile } from '../../database/entities/doctor-profile.entity';

@Injectable()
export class DoctorProfileService {
  constructor(
    @InjectRepository(DoctorProfile)
    private readonly repo: Repository<DoctorProfile>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async findByUser(userId: string) {
    return this.repo.findOne({ where: { userId } });
  }

  async create(dto: Partial<DoctorProfile>) {
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }

  async update(id: string, dto: Partial<DoctorProfile>) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Doctor profile not found');
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string) {
    await this.repo.delete(id);
  }
}
