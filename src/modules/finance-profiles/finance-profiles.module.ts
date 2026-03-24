import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceProfilesController } from './finance-profiles.controller';
import { FinanceProfilesService } from './finance-profiles.service';
import { FinanceProfile } from '../../database/entities/finance-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FinanceProfile])],
  controllers: [FinanceProfilesController],
  providers: [FinanceProfilesService],
  exports: [FinanceProfilesService],
})
export class FinanceProfilesModule {}
