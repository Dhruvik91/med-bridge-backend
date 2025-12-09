import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from '../../database/entities/application.entity';
import { Job } from '../../database/entities/job.entity';
import { User } from '../../database/entities/user.entity';
import { DoctorProfile } from '../../database/entities/doctor-profile.entity';
import { ApplicationsService } from "./applications.service";
import { ApplicationsController } from './applications.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Application, Job, User, DoctorProfile])],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService],
})
export class ApplicationsModule { }