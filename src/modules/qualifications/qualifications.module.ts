import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qualification } from '../../database/entities/qualification.entity';
import { QualificationsService } from './qualifications.service';
import { QualificationsController } from './qualifications.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Qualification])],
    controllers: [QualificationsController],
    providers: [QualificationsService],
    exports: [QualificationsService],
})
export class QualificationsModule { }
