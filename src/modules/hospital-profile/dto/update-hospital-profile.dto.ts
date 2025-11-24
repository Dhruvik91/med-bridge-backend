import { PartialType } from '@nestjs/mapped-types';
import { CreateHospitalProfileDto } from './create-hospital-profile.dto';

export class UpdateHospitalProfileDto extends PartialType(CreateHospitalProfileDto) {}
