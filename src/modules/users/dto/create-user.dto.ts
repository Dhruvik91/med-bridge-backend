import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../../../database/entities/enums';

export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
}

export class CreateUserDto {
  @ApiProperty({ example: 'candidate@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @ApiProperty({ enum: UserRole, example: UserRole.candidate, default: UserRole.candidate })
  @IsEnum(UserRole)
  @IsOptional()
  userType?: UserRole;

  @ApiProperty({ enum: AuthProvider, example: AuthProvider.LOCAL, default: AuthProvider.LOCAL })
  @IsEnum(AuthProvider)
  @IsOptional()
  provider?: AuthProvider = AuthProvider.LOCAL;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean = false;
}
