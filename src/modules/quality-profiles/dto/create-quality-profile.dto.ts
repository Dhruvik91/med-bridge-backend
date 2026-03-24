import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsArray, IsString, IsInt, Min } from 'class-validator';

export class CreateQualityProfileDto {
  @ApiProperty({ format: 'uuid', description: 'Candidate role ID' })
  @IsUUID()
  candidateRoleId: string;

  @ApiProperty({ required: false, type: [String], description: 'Accreditation experience (NABH, JCI)' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  accreditationExperience?: string[];

  @ApiProperty({ required: false, description: 'Years of audit experience', default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  auditExperienceYears?: number;
}
