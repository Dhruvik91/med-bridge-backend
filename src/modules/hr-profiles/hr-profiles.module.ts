import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HRProfilesController } from './hr-profiles.controller';
import { HRProfilesService } from './hr-profiles.service';
import { HRProfile } from '../../database/entities/hr-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HRProfile])],
  controllers: [HRProfilesController],
  providers: [HRProfilesService],
  exports: [HRProfilesService],
})
export class HRProfilesModule {}
