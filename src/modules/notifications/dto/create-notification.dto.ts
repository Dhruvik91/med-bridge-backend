import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsObject } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({ format: 'uuid', description: 'User ID to receive notification' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'Notification type', example: 'application_status' })
  @IsString()
  type: string;

  @ApiProperty({ 
    required: false, 
    description: 'Additional notification data',
    example: { jobId: '123', status: 'accepted' }
  })
  @IsOptional()
  @IsObject()
  data?: Record<string, any>;
}
