import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CandidateRole } from './candidate-role.entity';

@Entity({ name: 'supply_chain_profiles', schema: 'public' })
export class SupplyChainProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'candidate_role_id' })
  candidateRoleId: string;

  @OneToOne(() => CandidateRole, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_role_id' })
  candidateRole: CandidateRole;

  @Column({ type: 'jsonb', name: 'inventory_systems', default: [] })
  inventorySystems: string[];

  @Column({ type: 'int', name: 'vendor_management_experience', default: 0 })
  vendorManagementExperience: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
