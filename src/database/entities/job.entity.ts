import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { HospitalProfile } from './hospital-profile.entity';
import { Application } from './application.entity';
import { JobStatus } from './enums';

@Entity({ name: 'jobs', schema: 'public' })
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'hospital_id' })
  hospitalId: string;

  @ManyToOne(() => HospitalProfile, (hp) => hp.jobs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hospital_id' })
  hospital: HospitalProfile;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', array: true, default: () => "'{}'" })
  requirements: string[];

  @Column({ type: 'int', name: 'salary_min', nullable: true })
  salaryMin: number | null;

  @Column({ type: 'int', name: 'salary_max', nullable: true })
  salaryMax: number | null;

  @Column({ type: 'text' })
  location: string;

  @Column({ type: 'boolean', default: false })
  remote: boolean;

  @Column({ type: 'text', nullable: true })
  shift: string | null;

  @Column({ type: 'text', nullable: true })
  department: string | null;

  @Column({ type: 'text', name: 'contract_type', nullable: true })
  contractType: string | null;

  @Column({ type: 'enum', enum: JobStatus, enumName: 'job_status', default: JobStatus.active })
  status: JobStatus;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Application, (a) => a.job)
  applications: Application[];
}
