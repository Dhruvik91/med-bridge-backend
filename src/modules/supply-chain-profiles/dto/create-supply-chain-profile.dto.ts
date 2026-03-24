import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsArray, IsString, IsInt, Min } from 'class-validator';

export class CreateSupplyChainProfileDto {
  @ApiProperty({ format: 'uuid', description: 'Candidate role ID' })
  @IsUUID()
  candidateRoleId: string;

  @ApiProperty({ required: false, type: [String], description: 'Inventory management systems' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  inventorySystems?: string[];

  @ApiProperty({ required: false, description: 'Years of vendor management experience', default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  vendorManagementExperience?: number;
}
