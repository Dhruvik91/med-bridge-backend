import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../../database/entities/organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly repo: Repository<Organization>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['employerProfile'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ 
      where: { id }, 
      relations: ['employerProfile'] 
    });
  }

  findByEmployer(employerProfileId: string) {
    return this.repo.find({ where: { employerProfileId } });
  }

  async create(dto: CreateOrganizationDto) {
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }

  async update(id: string, dto: UpdateOrganizationDto) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Organization not found');
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async remove(id: string) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Organization not found');
    await this.repo.remove(existing);
  }
}
