import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateLocalizacaoPessoaDto {
  @ApiProperty({
    example: '38.480134',
    description: 'Longitude do usuario',
  })
  @IsString()
  Longitude: string;

  @ApiProperty({
    example: '3.769325',
    description: 'Latitude do usuario',
  })
  @IsString()
  Latitude: string;
}
