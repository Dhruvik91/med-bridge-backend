import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CandidateRole } from './candidate-role.entity';

@Entity({ name: 'operations_profiles', schema: 'public' })
export class OperationsProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'candidate_role_id' })
  candidateRoleId: string;

  @OneToOne(() => CandidateRole, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_role_id' })
  candidateRole: CandidateRole;

  @Column({ type: 'text', name: 'hospital_size_handled', nullable: true })
  hospitalSizeHandled: string | null;

  @Column({ type: 'jsonb', name: 'process_expertise', default: [] })
  processExpertise: string[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
