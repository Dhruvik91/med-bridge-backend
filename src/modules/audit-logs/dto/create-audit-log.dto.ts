import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsObject } from 'class-validator';

export class CreateAuditLogDto {
  @ApiProperty({ format: 'uuid', required: false, description: 'User who performed the action' })
  @IsOptional()
  @IsUUID()
  actorUserId?: string;

  @ApiProperty({ description: 'Action performed', example: 'CREATE' })
  @IsString()
  action: string;

  @ApiProperty({ required: false, description: 'Type of resource', example: 'Job' })
  @IsOptional()
  @IsString()
  resourceType?: string;

  @ApiProperty({ format: 'uuid', required: false, description: 'Resource ID' })
  @IsOptional()
  @IsUUID()
  resourceId?: string;

  @ApiProperty({ 
    required: false, 
    description: 'State before action',
    example: { status: 'draft' }
  })
  @IsOptional()
  @IsObject()
  before?: Record<string, any>;

  @ApiProperty({ 
    required: false, 
    description: 'State after action',
    example: { status: 'published' }
  })
  @IsOptional()
  @IsObject()
  after?: Record<string, any>;
}
