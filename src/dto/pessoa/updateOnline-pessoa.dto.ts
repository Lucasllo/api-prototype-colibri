import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateOnlinePessoaDto {
  @ApiProperty({
    example: 'true',
    description: 'Status online do usuario',
  })
  @IsBoolean()
  online: boolean;
}
