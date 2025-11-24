import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  senderId: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  receiverId: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ required: false, format: 'uuid' })
  @IsOptional()
  @IsUUID()
  threadId?: string;
}
