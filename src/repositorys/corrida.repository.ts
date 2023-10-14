import { Injectable, BadRequestException } from '@nestjs/common';
import * as firebase from 'firebase-admin';
@Injectable()
export class CorridaRepository {
  private collectionCorridaRef: FirebaseFirestore.CollectionReference = firebase
    .firestore()
    .collection('corrida');

  public async getUser(id: string): Promise<any> {
    return this.collectionCorridaRef
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
        throw new BadRequestException(error.message);
      });
  }

  public async getAll(): Promise<firebase.firestore.DocumentData[]> {
    return (await this.collectionCorridaRef.get()).docs.map((doc) =>
      doc.data(),
    );
  }

  public async findAllByUser(
    userId: number,
  ): Promise<firebase.firestore.DocumentData[]> {
    if (Number.isNaN(userId)) {
      throw new BadRequestException('Pessoa não encontrado');
    }
    let pessoaRef = null;
    const collectionPessoaRef = firebase.firestore().collection('pessoa');
    const usuario = collectionPessoaRef.where('id', '==', userId);

    try {
      await usuario.get().then((u) => {
        u.forEach((u) => {
          pessoaRef = collectionPessoaRef.doc(u.id);
        });
      });

      if (pessoaRef != null) {
        return (
          await this.collectionCorridaRef.where('pessoa', '==', pessoaRef).get()
        ).docs.map((doc) => doc.data());
      } else {
        throw new BadRequestException('Pessoa não encontrado');
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async create(corrida, userId: number): Promise<any> {
    let pessoaRef = null;
    const collectionPessoaRef = firebase.firestore().collection('pessoa');
    const usuario = collectionPessoaRef.where('id', '==', userId);

    try {
      await usuario.get().then((u) => {
        u.forEach((u) => {
          pessoaRef = collectionPessoaRef.doc(u.id);
        });
      });
      if (pessoaRef != null) {
        corrida = { ...corrida, pessoa: pessoaRef };

        return this.collectionCorridaRef.add(corrida);
      } else {
        throw new BadRequestException('Pessoa não encontrado');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async update(id: string, corrida: any) {
    return this.collectionCorridaRef.doc(id).update(corrida);
  }

  public async remove(id: string, corrida: any) {
    return this.collectionCorridaRef.doc(id).update(corrida);
  }
}
