import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsOptional, IsArray, IsString, Min } from 'class-validator';

export class CreateHRProfileDto {
  @ApiProperty({ format: 'uuid', description: 'Candidate role ID' })
  @IsUUID()
  candidateRoleId: string;

  @ApiProperty({ required: false, type: [String], description: 'HR tools used' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  toolsUsed?: string[];

  @ApiProperty({ required: false, description: 'Years of hiring experience', default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  hiringExperienceYears?: number;

  @ApiProperty({ required: false, type: [String], description: 'Industries handled' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  industriesHandled?: string[];
}
