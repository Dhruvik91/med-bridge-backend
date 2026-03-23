import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Index } from 'typeorm';
import { CandidateRole } from './candidate-role.entity';
import { Qualification } from './qualification.entity';

@Entity({ name: 'candidate_qualifications', schema: 'public' })
export class CandidateQualification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'candidate_role_id' })
  @Index()
  candidateRoleId: string;

  @ManyToOne(() => CandidateRole, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_role_id' })
  candidateRole: CandidateRole;

  @Column({ type: 'uuid', name: 'qualification_id' })
  @Index()
  qualificationId: string;

  @ManyToOne(() => Qualification, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'qualification_id' })
  qualification: Qualification;

  @Column({ type: 'text', nullable: true })
  institution: string | null;

  @Column({ type: 'int', name: 'year_of_completion', nullable: true })
  yearOfCompletion: number | null;
}
