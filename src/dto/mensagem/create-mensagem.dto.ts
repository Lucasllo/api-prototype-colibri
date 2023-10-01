import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMensagemDto {
  @ApiProperty({
    example: 'Corrida terminada',
    description: 'Mensagem para o cliente',
  })
  @IsString()
  descricao: string;

  @ApiProperty({
    example: 'warning',
    description: 'Tipo de mensagem - (alert, warning, sucess)',
  })
  @IsString()
  tipo: string;

  @ApiProperty({
    example: '01-12-2023',
    description: 'Data de envio da mensagem',
  })
  @IsString()
  data: string;

  @ApiProperty({
    example: '1',
    description: 'ID do cliente para o qual a mensagem foi enviada',
  })
  pessoa: number;
}
