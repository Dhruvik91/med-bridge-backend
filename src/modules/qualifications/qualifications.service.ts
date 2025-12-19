import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Qualification } from '../../database/entities/qualification.entity';
import { CreateQualificationDto } from './dto/create-qualification.dto';
import { UpdateQualificationDto } from './dto/update-qualification.dto';

@Injectable()
export class QualificationsService {
    constructor(
        @InjectRepository(Qualification)
        private readonly repo: Repository<Qualification>,
    ) { }

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

    async create(dto: CreateQualificationDto) {
        const entity = this.repo.create(dto);
        return await this.repo.save(entity);
    }

    async update(id: string, dto: UpdateQualificationDto) {
        const existing = await this.repo.findOne({ where: { id } });
        if (!existing) throw new NotFoundException('Qualification not found');
        Object.assign(existing, dto);
        return await this.repo.save(existing);
    }

    async remove(id: string) {
        const existing = await this.repo.findOne({ where: { id } });
        if (!existing) throw new NotFoundException('Qualification not found');
        await this.repo.remove(existing);
    }
}
