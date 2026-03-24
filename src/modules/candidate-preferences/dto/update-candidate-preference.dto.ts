import { PartialType } from '@nestjs/swagger';
import { CreateCandidatePreferenceDto } from './create-candidate-preference.dto';

export class UpdateCandidatePreferenceDto extends PartialType(CreateCandidatePreferenceDto) {}
