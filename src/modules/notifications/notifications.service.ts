import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../database/entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { GetNotificationsQueryDto } from './dto/get-notifications-query.dto';
import { PageDto } from '../../core/dto/page.dto';
import { PageMetaDto } from '../../core/dto/page-meta.dto';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(Notification)
    private readonly repo: Repository<Notification>,
  ) {}

  async findAll(query: GetNotificationsQueryDto): Promise<PageDto<Notification>> {
    const queryBuilder = this.repo
      .createQueryBuilder('notification')
      .leftJoinAndSelect('notification.user', 'user')
      .orderBy('notification.createdAt', 'DESC')
      .skip(query.skip)
      .take(query.take);

    if (query.isRead !== undefined) {
      queryBuilder.andWhere('notification.isRead = :isRead', { isRead: query.isRead });
    }

    const [entities, itemCount] = await queryBuilder.getManyAndCount();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: query });
    
    return new PageDto(entities, pageMetaDto);
  }

  async findByUser(userId: string, query: GetNotificationsQueryDto): Promise<PageDto<Notification>> {
    const queryBuilder = this.repo
      .createQueryBuilder('notification')
      .where('notification.userId = :userId', { userId })
      .orderBy('notification.createdAt', 'DESC')
      .skip(query.skip)
      .take(query.take);

    if (query.isRead !== undefined) {
      queryBuilder.andWhere('notification.isRead = :isRead', { isRead: query.isRead });
    }

    const [entities, itemCount] = await queryBuilder.getManyAndCount();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: query });
    
    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string): Promise<Notification> {
    const notification = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return notification;
  }

  async create(dto: CreateNotificationDto): Promise<Notification> {
    this.logger.log(`Creating notification for user: ${dto.userId}`);
    const notification = this.repo.create(dto);
    return await this.repo.save(notification);
  }

  async update(id: string, dto: UpdateNotificationDto): Promise<Notification> {
    const existing = await this.findOne(id);
    Object.assign(existing, dto);
    return await this.repo.save(existing);
  }

  async markAsRead(id: string): Promise<Notification> {
    return this.update(id, { isRead: true });
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.repo
      .createQueryBuilder()
      .update(Notification)
      .set({ isRead: true })
      .where('userId = :userId AND isRead = false', { userId })
      .execute();
  }

  async remove(id: string): Promise<void> {
    const existing = await this.findOne(id);
    await this.repo.softRemove(existing);
  }

  async getUnreadCount(userId: string): Promise<number> {
    return await this.repo.count({
      where: { userId, isRead: false },
    });
  }
}
