import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserRole } from './enums';
import { DoctorProfile } from './doctor-profile.entity';
import { EmployerProfile } from './employer-profile.entity';
import { Message } from './message.entity';
import { Notification } from './notification.entity';

@Entity({ name: 'users', schema: 'public' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'text', name: 'password_hash', nullable: true })
  passwordHash: string | null;

  @Column({ type: 'enum', enum: UserRole, enumName: 'user_role', default: UserRole.candidate })
  role: UserRole;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', name: 'is_verified', default: false })
  isVerified: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
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

  @OneToOne(() => DoctorProfile, (dp) => dp.user)
  doctorProfile?: DoctorProfile;

  @OneToOne(() => EmployerProfile, (ep) => ep.user)
  employerProfile?: EmployerProfile;

  @OneToMany(() => Message, (m) => m.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (m) => m.receiver)
  receivedMessages: Message[];

  @OneToMany(() => Notification, (n) => n.user)
  notifications: Notification[];
}
