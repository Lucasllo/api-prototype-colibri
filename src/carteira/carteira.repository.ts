import { Injectable, BadRequestException } from '@nestjs/common';
import * as firebase from 'firebase-admin';
@Injectable()
export class CarteiraRepository {
  private _collectionRef: FirebaseFirestore.CollectionReference = firebase
    .firestore()
    .collection('carteira');

  public async getUser(id: string): Promise<any> {
    return this._collectionRef
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const carteira = doc.data();
          if (carteira.data) {
            carteira.data = new Date(carteira.data?.seconds * 1000);
          }
          return carteira;
        } else {
          throw new BadRequestException('Carteira não encontrada.');
        }
      })
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }

  public async getAll(): Promise<firebase.firestore.DocumentData[]> {
    return (await this._collectionRef.get()).docs.map((doc) => doc.data());
  }

  public async create(carteira): Promise<any> {
    return this._collectionRef.add(carteira);
  }

  public async update(id: string, carteira: any) {
    return this._collectionRef.doc(id).update(carteira);
  }

  public async remove(id: string, carteira: any) {
    return this._collectionRef.doc(id).update(carteira);
  }
}
