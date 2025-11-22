import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { UserRole } from './enums';
import { DoctorProfile } from './doctor-profile.entity';
import { HospitalProfile } from './hospital-profile.entity';
import { Message } from './message.entity';
import { Notification } from './notification.entity';

@Entity({ name: 'users', schema: 'public' })
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'enum', enum: UserRole, enumName: 'user_role' })
  role: UserRole;

  @Column({ type: 'text', nullable: true })
  name: string | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'uuid', name: 'profile_id', nullable: true })
  profileId: string | null;

  @Column({ type: 'boolean', name: 'is_verified', default: false })
  isVerified: boolean;

  @OneToOne(() => DoctorProfile, (dp) => dp.user)
  doctorProfile?: DoctorProfile;

  @OneToOne(() => HospitalProfile, (hp) => hp.user)
  hospitalProfile?: HospitalProfile;

  @OneToMany(() => Message, (m) => m.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (m) => m.receiver)
  receivedMessages: Message[];

  @OneToMany(() => Notification, (n) => n.user)
  notifications: Notification[];
}
