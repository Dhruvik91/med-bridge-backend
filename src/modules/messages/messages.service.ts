import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../database/entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly repo: Repository<Message>,
  ) {}

  findAllForUser(userId: string) {
    return this.repo.createQueryBuilder('message')
      .innerJoin('message.conversation', 'conversation')
      .innerJoin('conversation.participants', 'participant')
      .where('participant.userId = :userId', { userId })
      .orderBy('message.createdAt', 'ASC')
      .getMany();
  }

  async send(dto: Partial<Message>) {
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }
}
