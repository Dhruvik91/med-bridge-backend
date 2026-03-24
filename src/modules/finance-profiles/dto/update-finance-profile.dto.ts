import { PartialType } from '@nestjs/swagger';
import { CreateFinanceProfileDto } from './create-finance-profile.dto';

export class UpdateFinanceProfileDto extends PartialType(CreateFinanceProfileDto) {}
