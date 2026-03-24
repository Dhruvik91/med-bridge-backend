import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketingProfilesController } from './marketing-profiles.controller';
import { MarketingProfilesService } from './marketing-profiles.service';
import { MarketingProfile } from '../../database/entities/marketing-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarketingProfile])],
  controllers: [MarketingProfilesController],
  providers: [MarketingProfilesService],
  exports: [MarketingProfilesService],
})
export class MarketingProfilesModule {}
