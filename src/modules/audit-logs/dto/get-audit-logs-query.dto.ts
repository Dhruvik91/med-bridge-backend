import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsString } from 'class-validator';
import { PageOptionsDto } from '../../../core/dto/page-options.dto';

export class GetAuditLogsQueryDto extends PageOptionsDto {
  @ApiProperty({ required: false, format: 'uuid', description: 'Filter by actor user ID' })
  @IsOptional()
  @IsUUID()
  actorUserId?: string;

  @ApiProperty({ required: false, description: 'Filter by action', example: 'CREATE' })
  @IsOptional()
  @IsString()
  action?: string;

  @ApiProperty({ required: false, description: 'Filter by resource type', example: 'Job' })
  @IsOptional()
  @IsString()
  resourceType?: string;

  @ApiProperty({ required: false, format: 'uuid', description: 'Filter by resource ID' })
  @IsOptional()
  @IsUUID()
  resourceId?: string;
}
