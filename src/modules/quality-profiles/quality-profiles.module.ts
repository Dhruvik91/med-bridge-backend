import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityProfilesController } from './quality-profiles.controller';
import { QualityProfilesService } from './quality-profiles.service';
import { QualityProfile } from '../../database/entities/quality-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QualityProfile])],
  controllers: [QualityProfilesController],
  providers: [QualityProfilesService],
  exports: [QualityProfilesService],
})
export class QualityProfilesModule {}
