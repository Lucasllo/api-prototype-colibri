import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCorridaDto {
  @ApiProperty({
    example: '01-12-2023',
    description: 'Data da corrida',
  })
  @IsString()
  data: string;

  @ApiProperty({
    example: 'Rua x',
    description: 'Local inicial da corrida',
  })
  @IsString()
  localInicial: string;

  @ApiProperty({
    example: 'Rua x',
    description: 'Local final da corrida',
  })
  @IsString()
  localFinal: string;

  @ApiProperty({
    example: '12:04:00',
    description: 'Hora inicial da corrida',
  })
  @IsString()
  horaInicial: string;

  @ApiProperty({
    example: '12:04:00',
    description: 'Hora final da corrida',
  })
  @IsString()
  horaFinal: string;

  @ApiProperty({
    example: '00:45:00',
    description: 'Tempo total da corrida',
  })
  @IsString()
  tempoCorrida: string;

  @ApiProperty({
    example: 'Corrida de sorocaba',
    description: 'Titulo da corrida',
  })
  @IsString()
  titulo: string;
}
