import { PartialType } from '@nestjs/swagger';
import { CreateLegalProfileDto } from './create-legal-profile.dto';

export class UpdateLegalProfileDto extends PartialType(CreateLegalProfileDto) {}
