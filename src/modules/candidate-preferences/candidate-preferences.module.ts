import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidatePreferencesController } from './candidate-preferences.controller';
import { CandidatePreferencesService } from './candidate-preferences.service';
import { CandidatePreference } from '../../database/entities/candidate-preference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CandidatePreference])],
  controllers: [CandidatePreferencesController],
  providers: [CandidatePreferencesService],
  exports: [CandidatePreferencesService],
})
export class CandidatePreferencesModule {}
