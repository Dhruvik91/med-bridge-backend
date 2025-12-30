import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../../core/dto/pagination-query.dto';
import { UserRole } from '../../../database/entities/enums';

export class AdminUsersQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Search by email or name' })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ enum: UserRole, description: 'Filter by user role' })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ description: 'Filter by active status' })
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Filter by verified status' })
  @IsOptional()
  isVerified?: boolean;
}

export class AdminJobsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Search by title or description' })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ description: 'Filter by status' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'Filter by employer profile ID' })
  @IsOptional()
  @IsString()
  employerProfileId?: string;
}

export class AdminApplicationsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Search query' })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ description: 'Filter by status' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'Filter by job ID' })
  @IsOptional()
  @IsString()
  jobId?: string;

  @ApiPropertyOptional({ description: 'Filter by candidate ID' })
  @IsOptional()
  @IsString()
  candidateId?: string;
}
