import { PartialType } from '@nestjs/swagger';
import { CreateHRProfileDto } from './create-hr-profile.dto';

export class UpdateHRProfileDto extends PartialType(CreateHRProfileDto) {}
