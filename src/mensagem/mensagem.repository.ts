import { Injectable, BadRequestException } from '@nestjs/common';
import * as firebase from 'firebase-admin';
@Injectable()
export class MensagemRepository {
  private _collectionRef: FirebaseFirestore.CollectionReference = firebase
    .firestore()
    .collection('mensagem');

  public async getUser(id: string): Promise<any> {
    return this._collectionRef
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const mensagem = doc.data();
          mensagem.data = new Date(mensagem.data?.seconds * 1000);
          return mensagem;
        } else {
          throw new BadRequestException('Mensagem não encontrada.');
        }
      })
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }

  public async getAll(): Promise<firebase.firestore.DocumentData[]> {
    return (await this._collectionRef.get()).docs.map((doc) => doc.data());
  }

  public async create(mensagem): Promise<any> {
    return this._collectionRef.add(mensagem);
  }

  public async update(id: string, mensagem: any) {
    return this._collectionRef.doc(id).update(mensagem);
  }

  public async remove(id: string, mensagem: any) {
    return this._collectionRef.doc(id).update(mensagem);
  }
}
