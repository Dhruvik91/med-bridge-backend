import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty({ example: 'Python', description: 'Name of the skill' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
