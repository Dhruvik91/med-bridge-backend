import { IsNotEmpty, IsString, IsOptional, IsInt, IsUUID, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClinicalProfileDto {
  @ApiProperty({ example: 'uuid-of-candidate-role' })
  @IsUUID()
  @IsNotEmpty()
  candidateRoleId: string;

  @ApiProperty({ example: 'LIC-123456' })
  @IsString()
  @IsNotEmpty()
  licenseNumber: string;

  @ApiProperty({ example: 'Medical Council of India' })
  @IsString()
  @IsNotEmpty()
  registrationCouncil: string;

  @ApiProperty({ example: 5 })
  @IsInt()
  @IsOptional()
  experienceYears?: number;

  @ApiProperty({ example: 'OPD' })
  @IsString()
  @IsOptional()
  consultationType?: string;

  @ApiProperty({ example: 'Morning' })
  @IsString()
  @IsOptional()
  shiftPreference?: string;

  @ApiProperty({ example: ['Monday', 'Wednesday'], type: [String] })
  @IsArray()
  @IsOptional()
  availableDays?: string[];
}
