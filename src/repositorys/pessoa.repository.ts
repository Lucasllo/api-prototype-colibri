import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { Pessoa } from '../entities/pessoa.entity';

@Injectable()
export class PessoaRepository {
  private _collectionRef: FirebaseFirestore.CollectionReference = firebase
    .firestore()
    .collection('pessoa');

  public async getUser(id: number): Promise<any> {
    let result = null;
    const usuario = this._collectionRef.where('id', '==', id);

    await usuario.get().then((u) => {
      u.forEach((u) => {
        result = u.data();
      });
    });

    if (result != null) {
      return result;
    } else {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }
  }

  public async getAll(): Promise<firebase.firestore.DocumentData[]> {
    return (await this._collectionRef.get()).docs.map((doc) => doc.data());
  }

  public async create(pessoa: Pessoa): Promise<any> {
    const usuario = this._collectionRef.where('email', '==', pessoa.email);
    const usuarioTelefone = this._collectionRef.where(
      'telefone',
      '==',
      pessoa.telefone,
    );
    let usuarioExiste: boolean;

    await usuario.get().then((u) => {
      usuarioExiste = !u.empty;
    });

    if (!usuarioExiste) {
      await usuarioTelefone.get().then((u) => {
        usuarioExiste = !u.empty;
      });
    }

    if (usuarioExiste != undefined && usuarioExiste) {
      throw new UnauthorizedException('Email/Telefone ja cadastrado.');
    } else {
      pessoa.id = (await this._collectionRef.count().get()).data().count + 1;
      return this._collectionRef.add(pessoa);
    }
  }

  public async update(userId: number, pessoa: any) {
    try {
      const usuario = this._collectionRef.where('id', '==', userId);

      await usuario.get().then((u) => {
        u.forEach((u) => {
          this._collectionRef.doc(u.id).update(pessoa);
        });
      });
    } catch (error) {
      throw new BadRequestException('Erro ao fazer update');
    }
  }

  public async remove(id: string, pessoa: any) {
    try {
      const usuario = this._collectionRef.where('id', '==', id);
      await usuario.get().then((u) => {
        u.forEach((u) => {
          this._collectionRef.doc(u.id).update(pessoa);
        });
      });
    } catch (error) {
      throw new BadRequestException('Erro ao excluir conta');
    }
  }
}
