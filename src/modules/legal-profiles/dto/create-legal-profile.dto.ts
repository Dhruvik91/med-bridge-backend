import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsArray, IsString } from 'class-validator';

export class CreateLegalProfileDto {
  @ApiProperty({ format: 'uuid', description: 'Candidate role ID' })
  @IsUUID()
  candidateRoleId: string;

  @ApiProperty({ required: false, description: 'Compliance experience details' })
  @IsOptional()
  @IsString()
  complianceExperience?: string;

  @ApiProperty({ required: false, type: [String], description: 'Legal certifications' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certifications?: string[];
}
