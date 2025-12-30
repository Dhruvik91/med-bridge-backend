import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, IsNumber, IsArray, IsUUID, Min } from 'class-validator';
import { JobType } from '../../../database/entities/enums';
import { PaginationQueryDto } from '../../../core/dto/pagination-query.dto';

export enum PostedWithin {
    '24h' = '24h',
    '7d' = '7d',
    '30d' = '30d',
}

export class GetJobsQueryDto extends PaginationQueryDto {
    @ApiPropertyOptional({ description: 'Search query for title, description, or specialty' })
    @IsOptional()
    @IsString()
    q?: string;

    @ApiPropertyOptional({ description: 'Location (city, state, or country)' })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiPropertyOptional({ enum: JobType, description: 'Job type' })
    @IsOptional()
    @IsEnum(JobType)
    jobType?: JobType;

    @ApiPropertyOptional({ description: 'Minimum salary' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    salaryMin?: number;

    @ApiPropertyOptional({ description: 'Maximum salary' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    salaryMax?: number;

    @ApiPropertyOptional({ description: 'Minimum experience in years' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    experienceMin?: number;

    @ApiPropertyOptional({ description: 'Maximum experience in years' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    experienceMax?: number;

    @ApiPropertyOptional({ description: 'Filter by specialty IDs' })
    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    @Type(() => String)
    specialtyIds?: string[];

    @ApiPropertyOptional({ enum: PostedWithin, description: 'Filter by posted date' })
    @IsOptional()
    @IsEnum(PostedWithin)
    postedWithin?: PostedWithin;
}
