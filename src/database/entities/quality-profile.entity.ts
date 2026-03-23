import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, Index } from 'typeorm';
import { CandidateRole } from './candidate-role.entity';

@Entity({ name: 'quality_profiles', schema: 'public' })
export class QualityProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'candidate_role_id' })
  candidateRoleId: string;

  @OneToOne(() => CandidateRole, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_role_id' })
  candidateRole: CandidateRole;

  @Column({ type: 'jsonb', name: 'accreditation_experience', default: [] }) // NABH, JCI
  accreditationExperience: string[];

  @Column({ type: 'int', name: 'audit_experience_years', default: 0 })
  auditExperienceYears: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
