import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Conversation } from './conversation.entity';
import { Attachment } from './attachment.entity';

@Entity({ name: 'messages', schema: 'public' })
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'conversation_id' })
  @Index()
  conversationId: string;

  @ManyToOne(() => Conversation, (c) => c.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;

  @Column({ type: 'uuid', name: 'sender_id' })
  @Index()
  senderId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: ['text', 'file'], default: 'text', name: 'message_type' })
  messageType: string;

  @Column({ type: 'uuid', name: 'attachment_id', nullable: true })
  attachmentId: string | null;

  @ManyToOne(() => Attachment, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'attachment_id' })
  attachment: Attachment | null;

  @Column({ type: 'boolean', name: 'is_read', default: false })
  @Index()
  isRead: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  @Index()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'timestamptz', name: 'read_at', nullable: true })
  readAt: Date | null;
}
