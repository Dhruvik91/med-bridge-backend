import { PartialType } from '@nestjs/swagger';
import { CreateClinicalProfileDto } from './create-clinical-profile.dto';

export class UpdateClinicalProfileDto extends PartialType(CreateClinicalProfileDto) {}
