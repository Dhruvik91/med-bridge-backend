import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobNote } from '../../database/entities/job-note.entity';
import { JobNotesService } from './job-notes.service';
import { JobNotesController } from './job-notes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([JobNote])],
  controllers: [JobNotesController],
  providers: [JobNotesService],
  exports: [JobNotesService],
})
export class JobNotesModule {}
