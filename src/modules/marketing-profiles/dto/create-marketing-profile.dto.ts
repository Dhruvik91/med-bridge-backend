import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsArray, IsString } from 'class-validator';

export class CreateMarketingProfileDto {
  @ApiProperty({ format: 'uuid', description: 'Candidate role ID' })
  @IsUUID()
  candidateRoleId: string;

  @ApiProperty({ required: false, type: [String], description: 'Marketing channels (SEO, Ads, Social)' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  channels?: string[];

  @ApiProperty({ required: false, description: 'Campaign experience details' })
  @IsOptional()
  @IsString()
  campaignExperience?: string;
}
