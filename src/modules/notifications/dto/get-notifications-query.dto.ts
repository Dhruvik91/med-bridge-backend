import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { PageOptionsDto } from '../../../core/dto/page-options.dto';

export class GetNotificationsQueryDto extends PageOptionsDto {
  @ApiProperty({ required: false, description: 'Filter by read status' })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isRead?: boolean;
}
