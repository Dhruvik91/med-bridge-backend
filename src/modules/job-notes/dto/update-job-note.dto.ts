import { PartialType } from '@nestjs/mapped-types';
import { CreateJobNoteDto } from './create-job-note.dto';

export class UpdateJobNoteDto extends PartialType(CreateJobNoteDto) {}
