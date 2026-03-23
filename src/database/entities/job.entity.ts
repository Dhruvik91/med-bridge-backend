import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { EmployerProfile } from './employer-profile.entity';
import { Organization } from './organization.entity';
import { Location } from './location.entity';
import { User } from './user.entity';
import { Application } from './application.entity';
import { Specialty } from './specialty.entity';
import { Pillar } from './pillar.entity';
import { JobRole } from './job-role.entity';
import { Skill } from './skill.entity';
import { JobStatus, JobType } from './enums';

@Entity({ name: 'jobs', schema: 'public' })
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'employer_profile_id' })
  employerProfileId: string;

  @ManyToOne(() => EmployerProfile, (ep) => ep.jobs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employer_profile_id' })
  employerProfile: EmployerProfile;

  @Column({ type: 'uuid', name: 'organization_id', nullable: true })
  organizationId: string | null;

  @ManyToOne(() => Organization, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization | null;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', unique: true, nullable: true })
  slug: string | null;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', array: true, default: () => "'{}'" })
  requirements: string[];

  @Column({ type: 'text', array: true, default: () => "'{}'" })
  responsibilities: string[];

  @Column({ type: 'text', array: true, default: () => "'{}'" })
  perks: string[];

  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
    name: 'salary_min',
    nullable: true,
    transformer: {
      to: (value: number | null) => value,
      from: (value: string | null) => (value ? parseFloat(value) : null),
    },
  })
  salaryMin: number | null;

  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
    name: 'salary_max',
    nullable: true,
    transformer: {
      to: (value: number | null) => value,
      from: (value: string | null) => (value ? parseFloat(value) : null),
    },
  })
  salaryMax: number | null;

  @Column({ type: 'text', default: 'INR' })
  currency: string;

  @Column({ type: 'uuid', name: 'location_id', nullable: true })
  locationId: string | null;

  @ManyToOne(() => Location, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'location_id' })
  location: Location | null;

  @Column({ type: 'enum', enum: JobType, enumName: 'job_type', default: JobType.full_time })
  jobType: JobType;

  @Column({ type: 'uuid', name: 'posted_by_user_id', nullable: true })
  postedByUserId: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'posted_by_user_id' })
  postedBy: User | null;

  @Column({ type: 'enum', enum: JobStatus, enumName: 'job_status', default: JobStatus.draft })
  status: JobStatus;

  @Column({ type: 'timestamptz', name: 'published_at', nullable: true })
  publishedAt: Date | null;

  @Column({ type: 'timestamptz', name: 'application_deadline', nullable: true })
  applicationDeadline: Date | null;

  @Column({ type: 'int', name: 'max_applications', nullable: true })
  maxApplications: number | null;

  @Column({ type: 'int', name: 'experience_min', nullable: true })
  experienceMin: number | null;

  @Column({ type: 'int', name: 'experience_max', nullable: true })
  experienceMax: number | null;

  @Column({ type: 'bigint', name: 'views_count', default: 0 })
  viewsCount: number;

  @Column({ type: 'bigint', name: 'favorites_count', default: 0 })
  favoritesCount: number;

  @Column({ type: 'tsvector', name: 'search_vector', nullable: true })
  searchVector: string | null;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @Column({ type: 'uuid', name: 'pillar_id', nullable: true })
  @Index()
  pillarId: string | null;

  @ManyToOne(() => Pillar, (p) => p.jobs, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'pillar_id' })
  pillar: Pillar | null;

  @Column({ type: 'uuid', name: 'job_role_id', nullable: true })
  @Index()
  jobRoleId: string | null;

  @ManyToOne(() => JobRole, (jr) => jr.jobs, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'job_role_id' })
  jobRole: JobRole | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  @Index()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Application, (a) => a.job)
  applications: Application[];

  @ManyToMany(() => Specialty)
  @JoinTable({
    name: 'job_specialties',
    joinColumn: { name: 'job_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'specialty_id', referencedColumnName: 'id' },
  })
  specialties: Specialty[];

  @ManyToMany(() => Skill)
  @JoinTable({
    name: 'job_skills',
    joinColumn: { name: 'job_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'skill_id', referencedColumnName: 'id' },
  })
  skills: Skill[];
}

