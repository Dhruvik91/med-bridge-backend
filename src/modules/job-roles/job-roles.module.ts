import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobRolesController } from './job-roles.controller';
import { JobRolesService } from './job-roles.service';
import { JobRole } from '../../database/entities/job-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobRole])],
  controllers: [JobRolesController],
  providers: [JobRolesService],
  exports: [JobRolesService],
})
export class JobRolesModule {}
