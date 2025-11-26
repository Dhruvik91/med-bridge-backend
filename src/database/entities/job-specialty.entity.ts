import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Job } from './job.entity';
import { Specialty } from './specialty.entity';

@Entity({ name: 'job_specialties', schema: 'public' })
export class JobSpecialty {
  @PrimaryColumn({ type: 'uuid', name: 'job_id' })
  jobId: string;

  @PrimaryColumn({ type: 'uuid', name: 'specialty_id' })
  specialtyId: string;

  @ManyToOne(() => Job, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @ManyToOne(() => Specialty, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'specialty_id' })
  specialty: Specialty;
}
