import { PartialType } from '@nestjs/swagger';
import { CreateMarketingProfileDto } from './create-marketing-profile.dto';

export class UpdateMarketingProfileDto extends PartialType(CreateMarketingProfileDto) {}
