import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsArray, IsString } from 'class-validator';

export class CreateITProfileDto {
  @ApiProperty({ format: 'uuid', description: 'Candidate role ID' })
  @IsUUID()
  candidateRoleId: string;

  @ApiProperty({ required: false, type: [String], description: 'Technology stack' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  techStack?: string[];

  @ApiProperty({ required: false, type: [String], description: 'IT certifications' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certifications?: string[];
}
