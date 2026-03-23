import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PillarsController } from './pillars.controller';
import { PillarsService } from './pillars.service';
import { Pillar } from '../../database/entities/pillar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pillar])],
  controllers: [PillarsController],
  providers: [PillarsService],
  exports: [PillarsService],
})
export class PillarsModule {}
