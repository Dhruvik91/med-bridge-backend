import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LegalProfilesController } from './legal-profiles.controller';
import { LegalProfilesService } from './legal-profiles.service';
import { LegalProfile } from '../../database/entities/legal-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LegalProfile])],
  controllers: [LegalProfilesController],
  providers: [LegalProfilesService],
  exports: [LegalProfilesService],
})
export class LegalProfilesModule {}
