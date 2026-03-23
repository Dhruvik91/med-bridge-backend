import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePillarDto {
  @ApiProperty({ example: 'Clinical', description: 'Name of the professional pillar' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Healthcare professionals including doctors, nurses...', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
