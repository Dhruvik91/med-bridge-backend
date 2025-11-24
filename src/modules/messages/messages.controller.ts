import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from '../../database/entities/message.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { CreateMessageDto } from './dto/create-message.dto';

@ApiTags('Messages')
@ApiBearerAuth()
@Controller('messages')
export class MessagesController {
  constructor(private readonly service: MessagesService) {}

  @Get('user/:userId')
  @ApiOperation({ summary: 'List all messages for a user' })
  @ApiOkResponse({ type: Message, isArray: true })
  findAllForUser(@Param('userId') userId: string): Promise<Message[]> {
    return this.service.findAllForUser(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Send a message' })
  @ApiCreatedResponse({ type: Message })
  send(@Body() dto: CreateMessageDto) {
    return this.service.send(dto);
  }
}
