import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CandidateRole } from './candidate-role.entity';

@Entity({ name: 'finance_profiles', schema: 'public' })
export class FinanceProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'candidate_role_id' })
  candidateRoleId: string;

  @OneToOne(() => CandidateRole, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_role_id' })
  candidateRole: CandidateRole;

  @Column({ type: 'jsonb', default: [] })
  certifications: string[];

  @Column({ type: 'jsonb', name: 'accounting_tools', default: [] })
  accountingTools: string[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
