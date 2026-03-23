import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobRoleDto {
  @ApiProperty({ example: 'Nurse', description: 'Name of the job role' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Providing patient care...', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'uuid-of-pillar', description: 'ID of the parent pillar' })
  @IsUUID()
  @IsNotEmpty()
  pillarId: string;
}
