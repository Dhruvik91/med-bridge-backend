import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service';
import { AuditLog } from '../../database/entities/audit-log.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { GetAuditLogsQueryDto } from './dto/get-audit-logs-query.dto';
import {
  ApiCreatedResponseEnvelope,
  ApiOkResponseEnvelope,
  ApiPaginatedResponseEnvelope,
} from '../../core/swagger/response-envelope';
import { PageDto } from '../../core/dto/page.dto';

@ApiTags('Audit Logs')
@ApiBearerAuth()
@Controller('audit-logs')
export class AuditLogsController {
  constructor(private readonly service: AuditLogsService) {}

  @Get()
  @ApiOperation({ summary: 'List all audit logs' })
  @ApiPaginatedResponseEnvelope(AuditLog)
  findAll(@Query() query: GetAuditLogsQueryDto): Promise<PageDto<AuditLog>> {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get audit log by ID' })
  @ApiOkResponseEnvelope(AuditLog)
  @ApiNotFoundResponse({ description: 'Audit log not found' })
  findOne(@Param('id') id: string): Promise<AuditLog> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create an audit log entry' })
  @ApiCreatedResponseEnvelope(AuditLog)
  create(@Body() dto: CreateAuditLogDto): Promise<AuditLog> {
    return this.service.create(dto);
  }
}
