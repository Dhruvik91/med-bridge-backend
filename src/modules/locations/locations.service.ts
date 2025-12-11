import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../../database/entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly repo: Repository<Location>,
  ) {}

  async findAll(page = 1, limit = 50) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [items, total] = await this.repo.findAndCount({ take, skip });
    return { items, total, page, limit };
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async findByCity(city: string, page = 1, limit = 50) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [items, total] = await this.repo.findAndCount({ where: { city }, take, skip });
    return { items, total, page, limit };
  }

  async create(dto: CreateLocationDto) {
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }

  async update(id: string, dto: UpdateLocationDto) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Location not found');
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Location not found');
    await this.repo.remove(existing);
  }
}
