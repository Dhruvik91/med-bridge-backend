import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsArray } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty({ format: 'uuid', required: false, description: 'Related job ID' })
  @IsOptional()
  @IsUUID()
  jobId?: string;

  @ApiProperty({ 
    type: [String], 
    format: 'uuid', 
    description: 'Participant user IDs',
    example: ['123e4567-e89b-12d3-a456-426614174000']
  })
  @IsArray()
  @IsUUID('4', { each: true })
  participantIds: string[];
}
