import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsArray, IsString } from 'class-validator';

export class CreateFinanceProfileDto {
  @ApiProperty({ format: 'uuid', description: 'Candidate role ID' })
  @IsUUID()
  candidateRoleId: string;

  @ApiProperty({ required: false, type: [String], description: 'Finance certifications' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certifications?: string[];

  @ApiProperty({ required: false, type: [String], description: 'Accounting tools used' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  accountingTools?: string[];
}
