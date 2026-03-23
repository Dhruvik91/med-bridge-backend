import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, Index, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Gender } from './enums';
import { Location } from './location.entity';
import { CandidateRole } from './candidate-role.entity';

@Entity({ name: 'candidate_profiles', schema: 'public' })
export class CandidateProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @OneToOne(() => User, (u) => u.doctorProfile, { onDelete: 'CASCADE' }) // Temporary link to doctorProfile until fully refactored
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'text', name: 'full_name' })
  @Index()
  fullName: string;

  @Column({ type: 'text', nullable: true })
  @Index()
  phone: string | null;

  @Column({ type: 'date', nullable: true })
  dob: Date | null;

  @Column({ type: 'enum', enum: Gender, enumName: 'gender', nullable: true })
  gender: Gender | null;

  @Column({ type: 'int', name: 'experience_years', default: 0 })
  @Index()
  experienceYears: number;

  @Column({ type: 'uuid', name: 'current_location_id', nullable: true })
  currentLocationId: string | null;

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'current_location_id' })
  currentLocation: Location | null;

  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
    name: 'expected_salary_min',
    nullable: true,
    transformer: {
      to: (value: number | null) => value,
      from: (value: string | null) => (value ? parseFloat(value) : null),
    },
  })
  expectedSalaryMin: number | null;

  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
    name: 'expected_salary_max',
    nullable: true,
    transformer: {
      to: (value: number | null) => value,
      from: (value: string | null) => (value ? parseFloat(value) : null),
    },
  })
  expectedSalaryMax: number | null;

  @Column({ type: 'text', name: 'resume_url', nullable: true })
  resumeUrl: string | null;

  @Column({ type: 'text', nullable: true })
  bio: string | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  @Index()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => CandidateRole, (cr) => cr.candidate)
  roles: CandidateRole[];
}
