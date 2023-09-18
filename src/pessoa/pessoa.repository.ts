import { Injectable, BadRequestException } from '@nestjs/common';
import * as firebase from 'firebase-admin';
@Injectable()
export class PessoaRepository {
  private _collectionRef: FirebaseFirestore.CollectionReference = firebase
    .firestore()
    .collection('pessoa');

  public async getUser(id: string): Promise<any> {
    return this._collectionRef
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const pessoa = doc.data();
          pessoa.dataCadastro = new Date(pessoa.dataCadastro?.seconds * 1000);
          return pessoa;
        } else {
          throw new BadRequestException('Usuario não encontrado');
        }
      })
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }

  public async getAll(): Promise<firebase.firestore.DocumentData[]> {
    return (await this._collectionRef.get()).docs.map((doc) => doc.data());
  }

  public async create(pessoa): Promise<any> {
    return this._collectionRef.add(pessoa);
  }

  public async update(id: string, pessoa: any) {
    return this._collectionRef.doc(id).update(pessoa);
  }

  public async remove(id: string, pessoa: any) {
    return this._collectionRef.doc(id).update(pessoa);
  }
}
