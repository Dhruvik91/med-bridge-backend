import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CandidateProfile } from './candidate-profile.entity';

@Entity({ name: 'candidate_preferences', schema: 'public' })
export class CandidatePreference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'candidate_id' })
  @Index()
  candidateId: string;

  @ManyToOne(() => CandidateProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: CandidateProfile;

  @Column({ type: 'jsonb', name: 'preferred_locations', default: [] })
  preferredLocations: string[];

  @Column({ type: 'text', array: true, name: 'preferred_roles', default: [] })
  preferredRoles: string[];

  @Column({ type: 'numeric', precision: 12, scale: 2, name: 'expected_salary_min', nullable: true })
  expectedSalaryMin: string | null;
}
