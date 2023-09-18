import { IsString } from 'class-validator';

export class CreateMensagemDto {
  @IsString()
  descricao: string;

  @IsString()
  tipo: string;

  @IsString()
  data: string;
}
