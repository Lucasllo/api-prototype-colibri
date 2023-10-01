export class Mensagem {
  descricao: string;

  tipo: string;

  data: Date;

  constructor({ descricao, tipo, data }) {
    this.descricao = descricao;
    this.tipo = tipo;
    this.data = data;
  }
}
