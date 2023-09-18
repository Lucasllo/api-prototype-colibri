import { Injectable, BadRequestException } from '@nestjs/common';
import * as firebase from 'firebase-admin';
@Injectable()
export class CorridaRepository {
  private _collectionRef: FirebaseFirestore.CollectionReference = firebase
    .firestore()
    .collection('corrida');

  public async getUser(id: string): Promise<any> {
    return this._collectionRef
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const corrida = doc.data();
          corrida.horaInicial = new Date(corrida.horaInicial?.seconds * 1000);
          corrida.horaFinal = new Date(corrida.horaFinal?.seconds * 1000);
          corrida.data = new Date(corrida.data?.seconds * 1000);
          return corrida;
        } else {
          throw new BadRequestException('Corrida não encontrada.');
        }
      })
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }

  public async getAll(): Promise<firebase.firestore.DocumentData[]> {
    return (await this._collectionRef.get()).docs.map((doc) => doc.data());
  }

  public async create(corrida): Promise<any> {
    return this._collectionRef.add(corrida);
  }

  public async update(id: string, corrida: any) {
    return this._collectionRef.doc(id).update(corrida);
  }

  public async remove(id: string, corrida: any) {
    return this._collectionRef.doc(id).update(corrida);
  }
}
