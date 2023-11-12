import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { Pessoa } from '../entities/pessoa.entity';

@Injectable()
export class PessoaRepository {
  private collectionPessoaRef: FirebaseFirestore.CollectionReference = firebase
    .firestore()
    .collection('pessoa');

  public async getUser(id: number): Promise<Pessoa> {
    let result: Pessoa = null;
    const usuario = this.collectionPessoaRef.where('id', '==', id);

    await usuario.get().then((u) => {
      u.forEach((u) => {
        result = u.data() as Pessoa;
      });
    });

    if (result != null) {
      return result;
    } else {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }
  }

  public async getAll(): Promise<firebase.firestore.DocumentData[]> {
    return (await this.collectionPessoaRef.get()).docs.map((doc) => doc.data());
  }

  public async create(pessoa: Pessoa): Promise<any> {
    const usuario = this.collectionPessoaRef.where('email', '==', pessoa.email);
    const usuarioTelefone = this.collectionPessoaRef.where(
      'telefone',
      '==',
      pessoa.telefone,
    );

    const usuarioCPF = this.collectionPessoaRef.where('cpf', '==', pessoa.cpf);

    let usuarioExiste: boolean;

    await usuario.get().then((u) => {
      usuarioExiste = !u.empty;
    });

    if (!usuarioExiste) {
      await usuarioTelefone.get().then((u) => {
        usuarioExiste = !u.empty;
      });
    }

    if (!usuarioExiste) {
      await usuarioCPF.get().then((u) => {
        usuarioExiste = !u.empty;
      });
    }

    if (usuarioExiste != undefined && usuarioExiste) {
      throw new UnauthorizedException('Email/Telefone/CPF ja cadastrado.');
    } else {
      pessoa.id =
        (await this.collectionPessoaRef.count().get()).data().count + 1;
      return this.collectionPessoaRef.add(pessoa);
    }
  }

  public async update(userId: number, pessoa: any) {
    try {
      const usuario = this.collectionPessoaRef.where('id', '==', userId);

      await usuario.get().then((u) => {
        u.forEach((u) => {
          this.collectionPessoaRef.doc(u.id).update(pessoa);
        });
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async remove(id: number, pessoa: any) {
    try {
      const usuario = this.collectionPessoaRef.where('id', '==', id);
      await usuario.get().then((u) => {
        u.forEach((u) => {
          this.collectionPessoaRef.doc(u.id).update(pessoa);
        });
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
