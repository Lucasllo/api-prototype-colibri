import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { EnderecoDto } from '../endereco/endereco.dto';
import { UpdateLocalizacaoPessoaDto } from '../pessoa/updateLocalizacao-pessoa.dto';

export class CreateCorridaDto {
  @ApiProperty({
    example: '01-12-2023',
    description: 'Data da corrida',
  })
  @IsString()
  data: string;

  @ApiProperty({
    example: '{"longitude": "9999999", "latitude": "123456789"}',
    description: 'Coordenadas do local inicio da corrida',
  })
  @IsObject()
  coordenadaInicial: UpdateLocalizacaoPessoaDto;

  @ApiProperty({
    example: '{"longitude": "9999999", "latitude": "123456789"}',
    description: 'Coordenadas do local final da corrida',
  })
  @IsObject()
  coordenadaFinal: UpdateLocalizacaoPessoaDto;

  @ApiProperty({
    example:
      '{"logradouro": "Rua x", "numero": "123", "bairro": "Centro", "cep":"60987654", "cidade":"Fortaleza"}',
    description: 'Endereço do local inicio da corrida',
  })
  @IsObject()
  localInicial: EnderecoDto;

  @ApiProperty({
    example:
      '{"logradouro": "Rua x", "numero": "123", "bairro": "Centro", "cep":"60987654", "cidade":"Fortaleza"}',
    description: 'Endereço do local final da corrida',
  })
  @IsObject()
  localFinal: EnderecoDto;

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
