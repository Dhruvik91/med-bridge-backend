import { PageOptionsDto } from '../../../core/dto/page-options.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class JobRoleQueryDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: 'Filter by Pillar ID' })
  @IsUUID()
  @IsOptional()
  pillarId?: string;
}
