import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserRole } from '../../../database/entities/enums';

export class CreateUserDto {
  @ApiProperty({ example: 'doctor@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ enum: UserRole, example: UserRole.doctor })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ required: false, example: 'Dr. John Doe' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, format: 'uuid' })
  @IsOptional()
  @IsUUID()
  profileId?: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}
