import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsInt, IsOptional, IsArray, Min } from 'class-validator';

export class CreateClinicalProfileDto {
  @ApiProperty({ format: 'uuid', description: 'Candidate role ID' })
  @IsUUID()
  candidateRoleId: string;

  @ApiProperty({ description: 'Medical license number' })
  @IsString()
  licenseNumber: string;

  @ApiProperty({ description: 'Registration council name' })
  @IsString()
  registrationCouncil: string;

  @ApiProperty({ required: false, description: 'Years of experience in role', default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  experienceYears?: number;

  @ApiProperty({ required: false, description: 'Consultation type (OPD/IPD)' })
  @IsOptional()
  @IsString()
  consultationType?: string;

  @ApiProperty({ required: false, description: 'Shift preference' })
  @IsOptional()
  @IsString()
  shiftPreference?: string;

  @ApiProperty({ required: false, type: [String], description: 'Available days' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  availableDays?: string[];
}
