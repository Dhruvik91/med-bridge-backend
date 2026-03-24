import { Controller, Get, Post, Delete, Param, Body, Query, Req } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { Conversation } from '../../database/entities/conversation.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { GetConversationsQueryDto } from './dto/get-conversations-query.dto';
import {
  ApiCreatedResponseEnvelope,
  ApiOkResponseEnvelope,
  ApiPaginatedResponseEnvelope,
  EmptyResponseDto,
} from '../../core/swagger/response-envelope';
import { PageDto } from '../../core/dto/page.dto';

@ApiTags('Conversations')
@ApiBearerAuth()
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly service: ConversationsService) {}

  @Get()
  @ApiOperation({ summary: 'List all conversations' })
  @ApiPaginatedResponseEnvelope(Conversation)
  findAll(@Query() query: GetConversationsQueryDto): Promise<PageDto<Conversation>> {
    return this.service.findAll(query);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user conversations' })
  @ApiPaginatedResponseEnvelope(Conversation)
  findMyConversations(
    @Req() req: Request,
    @Query() query: GetConversationsQueryDto,
  ): Promise<PageDto<Conversation>> {
    const payload = (req as any).user as { id: string };
    return this.service.findByUser(payload.id, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get conversation by ID' })
  @ApiOkResponseEnvelope(Conversation)
  @ApiNotFoundResponse({ description: 'Conversation not found' })
  findOne(@Param('id') id: string): Promise<Conversation> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a conversation' })
  @ApiCreatedResponseEnvelope(Conversation)
  create(@Body() dto: CreateConversationDto): Promise<Conversation> {
    return this.service.create(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a conversation' })
  @ApiOkResponseEnvelope(EmptyResponseDto)
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
