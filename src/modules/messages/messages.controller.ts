import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from '../../database/entities/message.entity';

@Controller('messages')
export class MessagesController {
  constructor(private readonly service: MessagesService) {}

  @Get('user/:userId')
  findAllForUser(@Param('userId') userId: string): Promise<Message[]> {
    return this.service.findAllForUser(userId);
  }

  @Post()
  send(@Body() dto: Partial<Message>) {
    return this.service.send(dto);
  }
}
