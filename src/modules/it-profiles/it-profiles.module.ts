import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ITProfilesController } from './it-profiles.controller';
import { ITProfilesService } from './it-profiles.service';
import { ITProfile } from '../../database/entities/it-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ITProfile])],
  controllers: [ITProfilesController],
  providers: [ITProfilesService],
  exports: [ITProfilesService],
})
export class ITProfilesModule {}
