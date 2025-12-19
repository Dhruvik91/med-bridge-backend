import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { JobStatus, JobType } from '../../../database/entities/enums';

export class CreateJobDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  employerProfileId: string;

  @ApiProperty({ required: false, format: 'uuid' })
  @IsOptional()
  @IsUUID()
  organizationId?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  responsibilities?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  perks?: string[];

  @ApiProperty({ required: false, description: 'Minimum salary as decimal string' })
  @IsOptional()
  @IsString()
  salaryMin?: string;

  @ApiProperty({ required: false, description: 'Maximum salary as decimal string' })
  @IsOptional()
  @IsString()
  salaryMax?: string;

  @ApiProperty({ required: false, default: 'INR' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ required: false, format: 'uuid' })
  @IsOptional()
  @IsUUID()
  locationId?: string;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean()
  remote?: boolean;

  @ApiProperty({ required: false, enum: JobType, default: JobType.full_time })
  @IsOptional()
  @IsEnum(JobType)
  jobType?: JobType;

  @ApiProperty({ required: false, format: 'uuid' })
  @IsOptional()
  @IsUUID()
  postedByUserId?: string;

  @ApiProperty({ required: false, enum: JobStatus, default: JobStatus.draft })
  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;

  @ApiProperty({ required: false, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  publishedAt?: string;

  @ApiProperty({ required: false, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  applicationDeadline?: string;

  @ApiProperty({ required: false, minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxApplications?: number;

  @ApiProperty({ required: false, type: 'object' })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @ApiProperty({ type: [String], required: false, format: 'uuid' })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  specialtyIds?: string[];
}
