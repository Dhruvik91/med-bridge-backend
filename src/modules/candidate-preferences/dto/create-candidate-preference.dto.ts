import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsArray, IsString } from 'class-validator';

export class CreateCandidatePreferenceDto {
  @ApiProperty({ format: 'uuid', description: 'Candidate profile ID' })
  @IsUUID()
  candidateId: string;

  @ApiProperty({ 
    required: false, 
    type: [String], 
    description: 'Preferred location IDs',
    example: ['city1', 'city2']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredLocations?: string[];

  @ApiProperty({ 
    required: false, 
    type: [String], 
    description: 'Preferred role names',
    example: ['Surgeon', 'General Practitioner']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredRoles?: string[];

  @ApiProperty({ 
    required: false, 
    description: 'Minimum expected salary',
    example: 50000
  })
  @IsOptional()
  @IsString()
  expectedSalaryMin?: string;
}
