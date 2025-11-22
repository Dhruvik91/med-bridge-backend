import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'doctor_profiles', schema: 'public' })
export class DoctorProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id', unique: true })
  userId: string;

  @OneToOne(() => User, (u) => u.doctorProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'text', array: true, default: () => "'{}'" })
  specialties: string[];

  @Column({ type: 'text', array: true, name: 'license_numbers', default: () => "'{}'" })
  licenseNumbers: string[];

  @Column({ type: 'text', nullable: true })
  bio: string | null;

  @Column({ type: 'text', name: 'cv_url', nullable: true })
  cvUrl: string | null;

  @Column({ type: 'text', array: true, default: () => "'{}'" })
  locations: string[];

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  rating: string | null;

  @Column({ type: 'int', name: 'experience_years', nullable: true })
  experienceYears: number | null;

  @Column({ type: 'text', nullable: true })
  availability: string | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
