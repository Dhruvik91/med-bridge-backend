import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicalProfilesController } from './clinical-profiles.controller';
import { ClinicalProfilesService } from './clinical-profiles.service';
import { ClinicalProfile } from '../../database/entities/clinical-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicalProfile])],
  controllers: [ClinicalProfilesController],
  providers: [ClinicalProfilesService],
  exports: [ClinicalProfilesService],
})
export class ClinicalProfilesModule {}
