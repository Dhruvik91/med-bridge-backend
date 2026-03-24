import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '../../database/entities/audit-log.entity';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { GetAuditLogsQueryDto } from './dto/get-audit-logs-query.dto';
import { PageDto } from '../../core/dto/page.dto';
import { PageMetaDto } from '../../core/dto/page-meta.dto';

@Injectable()
export class AuditLogsService {
  private readonly logger = new Logger(AuditLogsService.name);

  constructor(
    @InjectRepository(AuditLog)
    private readonly repo: Repository<AuditLog>,
  ) {}

  async findAll(query: GetAuditLogsQueryDto): Promise<PageDto<AuditLog>> {
    const queryBuilder = this.repo
      .createQueryBuilder('auditLog')
      .leftJoinAndSelect('auditLog.actor', 'actor')
      .orderBy('auditLog.createdAt', 'DESC')
      .skip(query.skip)
      .take(query.take);

    if (query.actorUserId) {
      queryBuilder.andWhere('auditLog.actorUserId = :actorUserId', { actorUserId: query.actorUserId });
    }

    if (query.action) {
      queryBuilder.andWhere('auditLog.action = :action', { action: query.action });
    }

    if (query.resourceType) {
      queryBuilder.andWhere('auditLog.resourceType = :resourceType', { resourceType: query.resourceType });
    }

    if (query.resourceId) {
      queryBuilder.andWhere('auditLog.resourceId = :resourceId', { resourceId: query.resourceId });
    }

    const [entities, itemCount] = await queryBuilder.getManyAndCount();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: query });
    
    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string): Promise<AuditLog> {
    const log = await this.repo.findOne({
      where: { id },
      relations: ['actor'],
    });

    if (!log) {
      throw new NotFoundException('Audit log not found');
    }

    return log;
  }

  async create(dto: CreateAuditLogDto): Promise<AuditLog> {
    this.logger.log(`Creating audit log: ${dto.action} on ${dto.resourceType}`);
    const log = this.repo.create(dto);
    return await this.repo.save(log);
  }

  async logAction(
    action: string,
    actorUserId: string | null,
    resourceType?: string,
    resourceId?: string,
    before?: Record<string, any>,
    after?: Record<string, any>,
  ): Promise<AuditLog> {
    return this.create({
      action,
      actorUserId: actorUserId || undefined,
      resourceType,
      resourceId,
      before,
      after,
    });
  }
}
