import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, Index } from 'typeorm';
import { CandidateRole } from './candidate-role.entity';

@Entity({ name: 'clinical_profiles', schema: 'public' })
export class ClinicalProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'candidate_role_id' })
  candidateRoleId: string;

  @OneToOne(() => CandidateRole, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_role_id' })
  candidateRole: CandidateRole;

  @Column({ type: 'text' })
  @Index()
  licenseNumber: string;

  @Column({ type: 'text' })
  registrationCouncil: string;

  @Column({ type: 'int', name: 'experience_years_in_role', default: 0 })
  experienceYears: number;

  @Column({ type: 'text', name: 'consultation_type', nullable: true }) // OPD/IPD
  consultationType: string | null;

  @Column({ type: 'text', name: 'shift_preference', nullable: true })
  shiftPreference: string | null;

  @Column({ type: 'jsonb', name: 'available_days', default: [] })
  availableDays: string[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
