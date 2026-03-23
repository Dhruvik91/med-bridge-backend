import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClinicalProfile } from './clinical-profile.entity';
import { HRProfile } from './hr-profile.entity';
import { FinanceProfile } from './finance-profile.entity';
import { ITProfile } from './it-profile.entity';
import { OperationsProfile } from './operations-profile.entity';
import { SupplyChainProfile } from './supply-chain-profile.entity';
import { QualityProfile } from './quality-profile.entity';
import { MarketingProfile } from './marketing-profile.entity';
import { LegalProfile } from './legal-profile.entity';
import { CandidateProfile } from './candidate-profile.entity';
import { JobRole } from './job-role.entity';

@Entity({ name: 'candidate_roles', schema: 'public' })
@Index(['candidateId', 'jobRoleId'], { unique: true })
export class CandidateRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'candidate_id' })
  candidateId: string;

  @ManyToOne(() => CandidateProfile, (cp) => cp.roles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: CandidateProfile;

  @Column({ type: 'uuid', name: 'job_role_id' })
  jobRoleId: string;

  @ManyToOne(() => JobRole, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_role_id' })
  jobRole: JobRole;

  @Column({ type: 'boolean', name: 'is_primary', default: false })
  isPrimary: boolean;
  @OneToOne(() => ClinicalProfile, (cp) => cp.candidateRole)
  clinicalProfile?: ClinicalProfile;

  @OneToOne(() => HRProfile, (hr) => hr.candidateRole)
  hrProfile?: HRProfile;

  @OneToOne(() => FinanceProfile, (f) => f.candidateRole)
  financeProfile?: FinanceProfile;

  @OneToOne(() => ITProfile, (it) => it.candidateRole)
  itProfile?: ITProfile;

  @OneToOne(() => OperationsProfile, (o) => o.candidateRole)
  operationsProfile?: OperationsProfile;

  @OneToOne(() => SupplyChainProfile, (sc) => sc.candidateRole)
  supplyChainProfile?: SupplyChainProfile;

  @OneToOne(() => QualityProfile, (q) => q.candidateRole)
  qualityProfile?: QualityProfile;

  @OneToOne(() => MarketingProfile, (m) => m.candidateRole)
  marketingProfile?: MarketingProfile;

  @OneToOne(() => LegalProfile, (l) => l.candidateRole)
  legalProfile?: LegalProfile;
}
