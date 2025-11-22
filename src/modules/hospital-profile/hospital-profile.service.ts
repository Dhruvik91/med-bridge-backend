import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HospitalProfile } from '../../database/entities/hospital-profile.entity';

@Injectable()
export class HospitalProfileService {
  constructor(
    @InjectRepository(HospitalProfile)
    private readonly repo: Repository<HospitalProfile>,
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

  async create(dto: Partial<HospitalProfile>) {
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }

  async update(id: string, dto: Partial<HospitalProfile>) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Hospital profile not found');
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string) {
    await this.repo.delete(id);
  }
}
