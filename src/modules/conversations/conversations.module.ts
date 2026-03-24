import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { Conversation } from '../../database/entities/conversation.entity';
import { ConversationParticipant } from '../../database/entities/conversation-participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, ConversationParticipant])],
  controllers: [ConversationsController],
  providers: [ConversationsService],
  exports: [ConversationsService],
})
export class ConversationsModule {}
