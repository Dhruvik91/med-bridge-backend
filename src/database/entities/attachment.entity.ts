import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'attachments', schema: 'public' })
@Index(['ownerType', 'ownerId'])
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', name: 'owner_type' })
  ownerType: string;

  @Column({ type: 'uuid', name: 'owner_id' })
  ownerId: string;

  @Column({ type: 'text', name: 'file_name' })
  fileName: string;

  @Column({ type: 'text', name: 'file_url' })
  fileUrl: string;

  @Column({ type: 'text', name: 'mime_type', nullable: true })
  mimeType: string | null;

  @Column({ type: 'bigint', name: 'size_bytes', nullable: true })
  sizeBytes: number | null;

  @Column({ type: 'uuid', name: 'uploaded_by', nullable: true })
  @Index()
  uploadedBy: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'uploaded_by' })
  uploader: User | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  @Index()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;
}
