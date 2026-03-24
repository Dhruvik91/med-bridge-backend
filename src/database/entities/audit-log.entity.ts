import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'audit_logs', schema: 'public' })
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'actor_user_id', nullable: true })
  @Index()
  actorUserId: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'actor_user_id' })
  actor: User | null;

  @Column({ type: 'text' })
  @Index()
  action: string;

  @Column({ type: 'text', name: 'resource_type', nullable: true })
  @Index()
  resourceType: string | null;

  @Column({ type: 'uuid', name: 'resource_id', nullable: true })
  @Index()
  resourceId: string | null;

  @Column({ type: 'jsonb', nullable: true })
  before: Record<string, any> | null;

  @Column({ type: 'jsonb', nullable: true })
  after: Record<string, any> | null;

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
