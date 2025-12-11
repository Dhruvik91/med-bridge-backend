import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findAll(page = 1, limit = 20) {
    const take = limit;
    const skip = (page - 1) * limit;
    const [items, total] = await this.usersRepo.findAndCount({ take, skip });
    return { items, total, page, limit };
  }

  findOne(id: string) {
    return this.usersRepo.findOne({ where: { id } });
  }

  async create(dto: Partial<User>) {
    const entity = this.usersRepo.create(dto);
    return await this.usersRepo.save(entity);
  }

  async update(id: string, dto: Partial<User>) {
    const existing = await this.usersRepo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('User not found');
    Object.assign(existing, dto);
    return await this.usersRepo.save(existing);
  }

  async remove(id: string) {
    await this.usersRepo.delete(id);
  }
}
