import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RecoverPasswordAuthDto {
  @ApiProperty({
    example: 'joao@mail.com ou 85986215433',
    description: 'Email ou Telefone do cliente',
  })
  @IsString()
  login: string;
}
