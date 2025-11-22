import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorProfile } from '../../database/entities/doctor-profile.entity';
import { DoctorProfileService } from './doctor-profile.service';
import { DoctorProfileController } from './doctor-profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorProfile])],
  controllers: [DoctorProfileController],
  providers: [DoctorProfileService],
  exports: [DoctorProfileService],
})
export class DoctorProfileModule {}
