import { Controller, Get, Post, Patch, Delete, Param, Body, Query, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from '../../database/entities/notification.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { GetNotificationsQueryDto } from './dto/get-notifications-query.dto';
import {
  ApiCreatedResponseEnvelope,
  ApiOkResponseEnvelope,
  ApiPaginatedResponseEnvelope,
  EmptyResponseDto,
} from '../../core/swagger/response-envelope';
import { PageDto } from '../../core/dto/page.dto';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'List all notifications' })
  @ApiPaginatedResponseEnvelope(Notification)
  findAll(@Query() query: GetNotificationsQueryDto): Promise<PageDto<Notification>> {
    return this.service.findAll(query);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user notifications' })
  @ApiPaginatedResponseEnvelope(Notification)
  findMyNotifications(
    @Req() req: Request,
    @Query() query: GetNotificationsQueryDto,
  ): Promise<PageDto<Notification>> {
    const payload = (req as any).user as { id: string };
    return this.service.findByUser(payload.id, query);
  }

  @Get('me/unread-count')
  @ApiOperation({ summary: 'Get unread notification count for current user' })
  @ApiOkResponseEnvelope(Number)
  async getUnreadCount(@Req() req: Request): Promise<{ count: number }> {
    const payload = (req as any).user as { id: string };
    const count = await this.service.getUnreadCount(payload.id);
    return { count };
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get notifications by user ID' })
  @ApiPaginatedResponseEnvelope(Notification)
  findByUser(
    @Param('userId') userId: string,
    @Query() query: GetNotificationsQueryDto,
  ): Promise<PageDto<Notification>> {
    return this.service.findByUser(userId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification by ID' })
  @ApiOkResponseEnvelope(Notification)
  @ApiNotFoundResponse({ description: 'Notification not found' })
  findOne(@Param('id') id: string): Promise<Notification> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a notification' })
  @ApiCreatedResponseEnvelope(Notification)
  create(@Body() dto: CreateNotificationDto): Promise<Notification> {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a notification' })
  @ApiOkResponseEnvelope(Notification)
  @ApiNotFoundResponse({ description: 'Notification not found' })
  update(@Param('id') id: string, @Body() dto: UpdateNotificationDto): Promise<Notification> {
    return this.service.update(id, dto);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiOkResponseEnvelope(Notification)
  @ApiNotFoundResponse({ description: 'Notification not found' })
  markAsRead(@Param('id') id: string): Promise<Notification> {
    return this.service.markAsRead(id);
  }

  @Patch('me/read-all')
  @ApiOperation({ summary: 'Mark all notifications as read for current user' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  async markAllAsRead(@Req() req: Request): Promise<void> {
    const payload = (req as any).user as { id: string };
    await this.service.markAllAsRead(payload.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
