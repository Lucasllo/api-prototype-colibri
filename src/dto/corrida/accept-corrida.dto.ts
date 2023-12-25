import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { CreateCorridaDto } from './create-corrida.dto';

export class AcceptCorridaDto {
  @ApiProperty({
    example: '0022100101',
    description: 'Codigo da corrida aceita',
  })
  @IsString()
  codigo: string;

  @ApiProperty({
    example: '',
    description: 'Corrida aceita',
  })
  @IsObject()
  corrida: CreateCorridaDto;
}
