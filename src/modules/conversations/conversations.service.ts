import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../../database/entities/conversation.entity';
import { ConversationParticipant } from '../../database/entities/conversation-participant.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { GetConversationsQueryDto } from './dto/get-conversations-query.dto';
import { PageDto } from '../../core/dto/page.dto';
import { PageMetaDto } from '../../core/dto/page-meta.dto';

@Injectable()
export class ConversationsService {
  private readonly logger = new Logger(ConversationsService.name);

  constructor(
    @InjectRepository(Conversation)
    private readonly repo: Repository<Conversation>,
    @InjectRepository(ConversationParticipant)
    private readonly participantRepo: Repository<ConversationParticipant>,
  ) {}

  async findAll(query: GetConversationsQueryDto): Promise<PageDto<Conversation>> {
    const queryBuilder = this.repo
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.job', 'job')
      .leftJoinAndSelect('conversation.participants', 'participants')
      .leftJoinAndSelect('participants.user', 'user')
      .orderBy('conversation.updatedAt', 'DESC')
      .skip(query.skip)
      .take(query.take);

    if (query.jobId) {
      queryBuilder.andWhere('conversation.jobId = :jobId', { jobId: query.jobId });
    }

    if (query.userId) {
      queryBuilder.andWhere('participants.userId = :userId', { userId: query.userId });
    }

    const [entities, itemCount] = await queryBuilder.getManyAndCount();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: query });
    
    return new PageDto(entities, pageMetaDto);
  }

  async findByUser(userId: string, query: GetConversationsQueryDto): Promise<PageDto<Conversation>> {
    const queryBuilder = this.repo
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.job', 'job')
      .leftJoinAndSelect('conversation.participants', 'participants')
      .leftJoinAndSelect('participants.user', 'user')
      .where('participants.userId = :userId', { userId })
      .orderBy('conversation.updatedAt', 'DESC')
      .skip(query.skip)
      .take(query.take);

    if (query.jobId) {
      queryBuilder.andWhere('conversation.jobId = :jobId', { jobId: query.jobId });
    }

    const [entities, itemCount] = await queryBuilder.getManyAndCount();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: query });
    
    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string): Promise<Conversation> {
    const conversation = await this.repo.findOne({
      where: { id },
      relations: ['job', 'participants', 'participants.user', 'messages'],
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return conversation;
  }

  async create(dto: CreateConversationDto): Promise<Conversation> {
    this.logger.log(`Creating conversation with ${dto.participantIds.length} participants`);
    
    const conversation = this.repo.create({
      jobId: dto.jobId || null,
    });
    
    const savedConversation = await this.repo.save(conversation);

    const participants = dto.participantIds.map(userId => 
      this.participantRepo.create({
        conversationId: savedConversation.id,
        userId,
      })
    );

    await this.participantRepo.save(participants);

    return this.findOne(savedConversation.id);
  }

  async remove(id: string): Promise<void> {
    const existing = await this.findOne(id);
    await this.repo.softRemove(existing);
  }

  async addParticipant(conversationId: string, userId: string): Promise<ConversationParticipant> {
    const participant = this.participantRepo.create({
      conversationId,
      userId,
    });
    return await this.participantRepo.save(participant);
  }

  async removeParticipant(conversationId: string, userId: string): Promise<void> {
    await this.participantRepo.delete({ conversationId, userId });
  }
}
