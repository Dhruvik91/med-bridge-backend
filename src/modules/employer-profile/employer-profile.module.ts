import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployerProfile } from '../../database/entities/employer-profile.entity';
import { EmployerProfileService } from './employer-profile.service';
import { EmployerProfileController } from './employer-profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EmployerProfile])],
  controllers: [EmployerProfileController],
  providers: [EmployerProfileService],
  exports: [EmployerProfileService],
})
export class EmployerProfileModule {}
