import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Pillar } from './pillar.entity';
import { Job } from './job.entity';

@Entity({ name: 'job_roles', schema: 'public' })
export class JobRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'uuid', name: 'pillar_id' })
  pillarId: string;

  @ManyToOne(() => Pillar, (p) => p.roles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pillar_id' })
  pillar: Pillar;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @OneToMany(() => Job, (j) => j.jobRole)
  jobs: Job[];
}
