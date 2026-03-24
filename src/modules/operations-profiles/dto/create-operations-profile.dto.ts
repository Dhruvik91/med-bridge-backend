import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsArray, IsString } from 'class-validator';

export class CreateOperationsProfileDto {
  @ApiProperty({ format: 'uuid', description: 'Candidate role ID' })
  @IsUUID()
  candidateRoleId: string;

  @ApiProperty({ required: false, description: 'Hospital size handled' })
  @IsOptional()
  @IsString()
  hospitalSizeHandled?: string;

  @ApiProperty({ required: false, type: [String], description: 'Process expertise areas' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  processExpertise?: string[];
}
