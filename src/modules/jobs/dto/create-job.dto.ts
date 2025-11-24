import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { JobStatus } from '../../../database/entities/enums';

export class CreateJobDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  hospitalId: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[];

  @ApiProperty({ required: false, minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  salaryMin?: number;

  @ApiProperty({ required: false, minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  salaryMax?: number;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean()
  remote?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  shift?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contractType?: string;

  @ApiProperty({ required: false, enum: JobStatus, default: JobStatus.active })
  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;
}
