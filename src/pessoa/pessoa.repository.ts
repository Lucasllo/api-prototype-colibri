import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as firebase from 'firebase-admin';

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

  public async create(pessoa): Promise<any> {
    pessoa.id = (await this._collectionRef.count().get()).data().count + 1;
    return this._collectionRef.add(pessoa);
  }

  public async update(id: string, pessoa: any) {
    return this._collectionRef.doc(id).update(pessoa);
  }

  public async remove(id: string, pessoa: any) {
    return this._collectionRef.doc(id).update(pessoa);
  }
}
