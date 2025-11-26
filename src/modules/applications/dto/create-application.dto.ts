import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApplicationStatus } from '../../../database/entities/enums';

export class CreateApplicationDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  jobId: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  candidateId: string;

  @ApiProperty({ required: false, format: 'uuid' })
  @IsOptional()
  @IsUUID()
  candidateProfileId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  coverLetter?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  resumeUrl?: string;

  @ApiProperty({ required: false, description: 'Expected salary as decimal string' })
  @IsOptional()
  @IsString()
  expectedSalary?: string;

  @ApiProperty({ required: false, enum: ApplicationStatus, default: ApplicationStatus.applied })
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  @ApiProperty({ required: false, type: [Object], description: 'Status change history' })
  @IsOptional()
  @IsArray()
  statusHistory?: Array<Record<string, any>>;

  @ApiProperty({ required: false, type: 'object' })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
