import { PartialType } from '@nestjs/swagger';
import { CreateOperationsProfileDto } from './create-operations-profile.dto';

export class UpdateOperationsProfileDto extends PartialType(CreateOperationsProfileDto) {}
