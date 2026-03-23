import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Index } from 'typeorm';
import { CandidateRole } from './candidate-role.entity';
import { Specialty } from './specialty.entity';

@Entity({ name: 'candidate_specialties', schema: 'public' })
export class CandidateSpecialty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'candidate_role_id' })
  @Index()
  candidateRoleId: string;

  @ManyToOne(() => CandidateRole, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_role_id' })
  candidateRole: CandidateRole;

  @Column({ type: 'uuid', name: 'specialty_id' })
  @Index()
  specialtyId: string;

  @ManyToOne(() => Specialty, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'specialty_id' })
  specialty: Specialty;
}
