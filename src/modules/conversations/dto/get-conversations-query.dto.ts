import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { PageOptionsDto } from '../../../core/dto/page-options.dto';

export class GetConversationsQueryDto extends PageOptionsDto {
  @ApiProperty({ required: false, format: 'uuid', description: 'Filter by job ID' })
  @IsOptional()
  @IsUUID()
  jobId?: string;

  @ApiProperty({ required: false, format: 'uuid', description: 'Filter by participant user ID' })
  @IsOptional()
  @IsUUID()
  userId?: string;
}
