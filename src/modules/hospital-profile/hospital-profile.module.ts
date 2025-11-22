import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalProfile } from '../../database/entities/hospital-profile.entity';
import { HospitalProfileService } from './hospital-profile.service';
import { HospitalProfileController } from './hospital-profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HospitalProfile])],
  controllers: [HospitalProfileController],
  providers: [HospitalProfileService],
  exports: [HospitalProfileService],
})
export class HospitalProfileModule {}
