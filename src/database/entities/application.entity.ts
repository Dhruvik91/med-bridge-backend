import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Job } from './job.entity';
import { DoctorProfile } from './doctor-profile.entity';
import { ApplicationStatus } from './enums';

@Entity({ name: 'applications', schema: 'public' })
@Unique(['jobId', 'doctorId'])
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'job_id' })
  jobId: string;

  @ManyToOne(() => Job, (j) => j.applications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @Column({ type: 'uuid', name: 'doctor_id' })
  doctorId: string;

  @ManyToOne(() => DoctorProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorProfile;

  @Column({ type: 'text', name: 'cover_letter', nullable: true })
  coverLetter: string | null;

  @Column({ type: 'enum', enum: ApplicationStatus, enumName: 'application_status', default: ApplicationStatus.pending })
  status: ApplicationStatus;

  @CreateDateColumn({ type: 'timestamptz', name: 'applied_at' })
  appliedAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
