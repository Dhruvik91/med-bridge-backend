import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationsProfilesController } from './operations-profiles.controller';
import { OperationsProfilesService } from './operations-profiles.service';
import { OperationsProfile } from '../../database/entities/operations-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OperationsProfile])],
  controllers: [OperationsProfilesController],
  providers: [OperationsProfilesService],
  exports: [OperationsProfilesService],
})
export class OperationsProfilesModule {}
