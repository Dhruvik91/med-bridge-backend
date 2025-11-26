import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from '../../database/entities/attachment.entity';
import { CreateAttachmentDto } from './dto/create-attachment.dto';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(Attachment)
    private readonly repo: Repository<Attachment>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['uploader'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ 
      where: { id }, 
      relations: ['uploader'] 
    });
  }

  findByOwner(ownerType: string, ownerId: string) {
    return this.repo.find({ 
      where: { ownerType, ownerId },
      relations: ['uploader'] 
    });
  }

  async create(dto: CreateAttachmentDto) {
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }

  async remove(id: string) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Attachment not found');
    await this.repo.remove(existing);
  }
}
