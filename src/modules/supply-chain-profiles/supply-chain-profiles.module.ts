import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyChainProfilesController } from './supply-chain-profiles.controller';
import { SupplyChainProfilesService } from './supply-chain-profiles.service';
import { SupplyChainProfile } from '../../database/entities/supply-chain-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplyChainProfile])],
  controllers: [SupplyChainProfilesController],
  providers: [SupplyChainProfilesService],
  exports: [SupplyChainProfilesService],
})
export class SupplyChainProfilesModule {}
