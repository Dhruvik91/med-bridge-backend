import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from '../../database/entities/specialty.entity';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';

@Injectable()
export class SpecialtiesService {
  constructor(
    @InjectRepository(Specialty)
    private readonly repo: Repository<Specialty>,
  ) {}

  async findAll(page = 1, limit = 100) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [items, total] = await this.repo.findAndCount({ take, skip });
    return { items, total, page, limit };
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  findBySlug(slug: string) {
    return this.repo.findOne({ where: { slug } });
  }

  async create(dto: CreateSpecialtyDto) {
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }

  async update(id: string, dto: UpdateSpecialtyDto) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Specialty not found');
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Specialty not found');
    await this.repo.remove(existing);
  }
}
