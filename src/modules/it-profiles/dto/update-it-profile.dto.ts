import { PartialType } from '@nestjs/swagger';
import { CreateITProfileDto } from './create-it-profile.dto';

export class UpdateITProfileDto extends PartialType(CreateITProfileDto) {}
