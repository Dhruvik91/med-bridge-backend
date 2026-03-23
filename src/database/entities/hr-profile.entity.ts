import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CandidateRole } from './candidate-role.entity';

@Entity({ name: 'hr_profiles', schema: 'public' })
export class HRProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'candidate_role_id' })
  candidateRoleId: string;

  @OneToOne(() => CandidateRole, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_role_id' })
  candidateRole: CandidateRole;

  @Column({ type: 'jsonb', name: 'tools_used', default: [] })
  toolsUsed: string[];

  @Column({ type: 'int', name: 'hiring_experience_years', default: 0 })
  hiringExperienceYears: number;

  @Column({ type: 'jsonb', name: 'industries_handled', default: [] })
  industriesHandled: string[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
