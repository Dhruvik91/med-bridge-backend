import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateProfilesController } from './candidate-profiles.controller';
import { CandidateProfilesService } from './candidate-profiles.service';
import { CandidateProfile } from '../../database/entities/candidate-profile.entity';
import { ClinicalProfile } from '../../database/entities/clinical-profile.entity';
import { HRProfile } from '../../database/entities/hr-profile.entity';
import { FinanceProfile } from '../../database/entities/finance-profile.entity';
import { ITProfile } from '../../database/entities/it-profile.entity';
import { OperationsProfile } from '../../database/entities/operations-profile.entity';
import { SupplyChainProfile } from '../../database/entities/supply-chain-profile.entity';
import { QualityProfile } from '../../database/entities/quality-profile.entity';
import { MarketingProfile } from '../../database/entities/marketing-profile.entity';
import { LegalProfile } from '../../database/entities/legal-profile.entity';
import { CandidateRole } from '../../database/entities/candidate-role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CandidateProfile,
      ClinicalProfile,
      HRProfile,
      FinanceProfile,
      ITProfile,
      OperationsProfile,
      SupplyChainProfile,
      QualityProfile,
      MarketingProfile,
      LegalProfile,
      CandidateRole,
    ]),
  ],
  controllers: [CandidateProfilesController],
  providers: [CandidateProfilesService],
  exports: [CandidateProfilesService],
})
export class CandidateProfilesModule { }
