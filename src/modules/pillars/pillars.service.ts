import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pillar } from '../../database/entities/pillar.entity';
import { CreatePillarDto } from './dto/create-pillar.dto';
import { UpdatePillarDto } from './dto/update-pillar.dto';
import { PageOptionsDto } from '../../core/dto/page-options.dto';
import { PageDto } from '../../core/dto/page.dto';
import { PageMetaDto } from '../../core/dto/page-meta.dto';

@Injectable()
export class PillarsService {
  constructor(
    @InjectRepository(Pillar)
    private readonly pillarRepository: Repository<Pillar>,
  ) {}

  async create(createPillarDto: CreatePillarDto): Promise<Pillar> {
    const pillar = this.pillarRepository.create(createPillarDto);
    return this.pillarRepository.save(pillar);
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Pillar>> {
    const queryBuilder = this.pillarRepository.createQueryBuilder('pillar');

    if (pageOptionsDto.q) {
      queryBuilder.where('pillar.name ILIKE :q OR pillar.description ILIKE :q', {
        q: `%${pageOptionsDto.q}%`,
      });
    }

    queryBuilder
      .orderBy('pillar.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string): Promise<Pillar> {
    const pillar = await this.pillarRepository.findOne({ where: { id } });
    if (!pillar) {
      throw new NotFoundException(`Pillar with ID ${id} not found`);
    }
    return pillar;
  }

  async update(id: string, updatePillarDto: UpdatePillarDto): Promise<Pillar> {
    const pillar = await this.findOne(id);
    this.pillarRepository.merge(pillar, updatePillarDto);
    return this.pillarRepository.save(pillar);
  }

  async remove(id: string): Promise<void> {
    const pillar = await this.findOne(id);
    await this.pillarRepository.remove(pillar);
  }
}
