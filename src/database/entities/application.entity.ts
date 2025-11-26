import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Job } from './job.entity';
import { User } from './user.entity';
import { DoctorProfile } from './doctor-profile.entity';
import { ApplicationStatus } from './enums';

@Entity({ name: 'applications', schema: 'public' })
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'job_id' })
  jobId: string;

  @ManyToOne(() => Job, (j) => j.applications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @Column({ type: 'uuid', name: 'candidate_id' })
  candidateId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: User;

  @Column({ type: 'uuid', name: 'candidate_profile_id', nullable: true })
  candidateProfileId: string | null;

  @ManyToOne(() => DoctorProfile, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'candidate_profile_id' })
  candidateProfile: DoctorProfile | null;

  @Column({ type: 'text', name: 'cover_letter', nullable: true })
  coverLetter: string | null;

  @Column({ type: 'text', name: 'resume_url', nullable: true })
  resumeUrl: string | null;

  @Column({ type: 'numeric', precision: 12, scale: 2, name: 'expected_salary', nullable: true })
  expectedSalary: string | null;

  @Column({ type: 'enum', enum: ApplicationStatus, enumName: 'application_status', default: ApplicationStatus.applied })
  status: ApplicationStatus;

  @Column({ type: 'jsonb', name: 'status_history', default: () => "'[]'" })
  statusHistory: Array<Record<string, any>>;

  @CreateDateColumn({ type: 'timestamptz', name: 'applied_at' })
  appliedAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'timestamptz', name: 'withdrawn_at', nullable: true })
  withdrawnAt: Date | null;

  @Column({ type: 'boolean', default: false })
  archived: boolean;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;
}

