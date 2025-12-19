import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Gender } from './enums';

@Entity({ name: 'doctor_profiles', schema: 'public' })
export class DoctorProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @OneToOne(() => User, (u) => u.doctorProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'text', name: 'full_name' })
  fullName: string;

  @Column({ type: 'text', name: 'display_name', nullable: true })
  displayName: string | null;

  @Column({ type: 'date', nullable: true })
  dob: Date | null;

  @Column({ type: 'enum', enum: Gender, enumName: 'gender', nullable: true })
  gender: Gender | null;

  @Column({ type: 'text', nullable: true })
  phone: string | null;

  @Column({ type: 'text', nullable: true })
  summary: string | null;

  @Column({ type: 'int', name: 'experience_years', nullable: true })
  experienceYears: number | null;

  @Column({ type: 'uuid', array: true, default: () => "'{}'" })
  qualifications: string[];

  @Column({ type: 'uuid', array: true, default: () => "'{}'" })
  specialties: string[];

  @Column({ type: 'text', array: true, name: 'license_numbers', default: () => "'{}'" })
  licenseNumbers: string[];

  @Column({ type: 'text', nullable: true })
  country: string | null;

  @Column({ type: 'text', nullable: true })
  city: string | null;

  @Column({ type: 'text', nullable: true })
  address: string | null;

  @Column({ type: 'text', name: 'avatar_url', nullable: true })
  avatarUrl: string | null;

  @Column({ type: 'text', name: 'resume_url', nullable: true })
  resumeUrl: string | null;

  @Column({ type: 'jsonb', name: 'social_links', default: {} })
  socialLinks: Record<string, any>;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
