import { IsNotEmpty, IsString, IsOptional, IsEnum, IsNumber, IsUUID, IsDateString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../../database/entities/enums';

export class CreateCandidateProfileDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsDateString()
  @IsOptional()
  dob?: string;

  @ApiProperty({ enum: Gender, example: Gender.male })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(0)
  @Max(50)
  @IsOptional()
  experienceYears?: number;

  @ApiProperty({ example: 'uuid-of-location' })
  @IsUUID()
  @IsOptional()
  currentLocationId?: string;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @IsOptional()
  expectedSalaryMin?: number;

  @ApiProperty({ example: 80000 })
  @IsNumber()
  @IsOptional()
  expectedSalaryMax?: number;

  @ApiProperty({ example: 'https://example.com/resume.pdf' })
  @IsString()
  @IsOptional()
  resumeUrl?: string;

  @ApiProperty({ example: 'Excited about healthcare opportunities...' })
  @IsString()
  @IsOptional()
  bio?: string;
}
