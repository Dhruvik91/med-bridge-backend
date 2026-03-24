import { PartialType } from '@nestjs/swagger';
import { CreateSupplyChainProfileDto } from './create-supply-chain-profile.dto';

export class UpdateSupplyChainProfileDto extends PartialType(CreateSupplyChainProfileDto) {}
