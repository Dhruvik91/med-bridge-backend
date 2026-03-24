import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserRole } from './enums';
import { DoctorProfile } from './doctor-profile.entity';
import { EmployerProfile } from './employer-profile.entity';
import { CandidateProfile } from './candidate-profile.entity';
import { ConversationParticipant } from './conversation-participant.entity';
import { Message } from './message.entity';
import { Notification } from './notification.entity';
import { SavedJob } from './saved-job.entity';
import { Application } from './application.entity';

@Entity({ name: 'users', schema: 'public' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  @Index()
  email: string;

  @Exclude()
  @Column({ type: 'text', name: 'password_hash', nullable: true, select: false })
  passwordHash: string | null;

  @Column({ type: 'enum', name: 'user_type', enum: UserRole, enumName: 'user_role', default: UserRole.candidate })
  @Index()
  userType: UserRole;

  @Column({ type: 'enum', enum: ['local', 'google'], default: 'local' })
  provider: string;

  @Column({ type: 'boolean', name: 'is_verified', default: false })
  @Index()
  isVerified: boolean;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  @Index()
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  @Index()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @Exclude()
  @Column({ type: 'text', name: 'password_reset_token', nullable: true })
  passwordResetToken: string | null;

  @Column({ type: 'timestamptz', name: 'password_reset_expires', nullable: true })
  passwordResetExpires: Date | null;

  @OneToOne(() => CandidateProfile, (cp) => cp.user)
  candidateProfile?: CandidateProfile;

  @OneToOne(() => DoctorProfile, (dp) => dp.user)
  doctorProfile?: DoctorProfile;

  @OneToOne(() => EmployerProfile, (ep) => ep.user)
  employerProfile?: EmployerProfile;

  @OneToMany(() => ConversationParticipant, (cp) => cp.user)
  conversationParticipants: ConversationParticipant[];

  @OneToMany(() => Notification, (n) => n.user)
  notifications: Notification[];

  @OneToMany(() => SavedJob, (sj) => sj.user)
  savedJobs: SavedJob[];

  @OneToMany(() => Application, (a) => a.candidate)
  applications: Application[];

  @OneToMany(() => Message, (m) => m.sender)
  sentMessages: Message[];
}
