import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User } from '../../database/entities/user.entity';
import { DoctorProfile } from '../../database/entities/doctor-profile.entity';
import { EmployerProfile } from '../../database/entities/employer-profile.entity';
import { Job } from '../../database/entities/job.entity';
import { Application } from '../../database/entities/application.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      DoctorProfile,
      EmployerProfile,
      Job,
      Application,
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
