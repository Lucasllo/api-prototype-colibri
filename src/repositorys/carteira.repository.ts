import { Injectable, BadRequestException } from '@nestjs/common';
import * as firebase from 'firebase-admin';
@Injectable()
export class CarteiraRepository {
  private collectionCarteiraRef: FirebaseFirestore.CollectionReference =
    firebase.firestore().collection('carteira');

  public async getAll(): Promise<firebase.firestore.DocumentData[]> {
    return (await this.collectionCarteiraRef.get()).docs.map((doc) =>
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
          await this.collectionCarteiraRef
            .where('pessoa', '==', pessoaRef)
            .where('ativo', '==', true)
            .get()
        ).docs.map((doc) => doc.data());
      } else {
        throw new BadRequestException('Pessoa não encontrado');
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async create(carteira, userId: number): Promise<any> {
    let pessoaRef = null;
    let carteiraRef = null;
    const collectionPessoaRef = firebase.firestore().collection('pessoa');
    const usuario = collectionPessoaRef.where('id', '==', userId);

    try {
      await usuario
        .get()
        .then((u) => {
          u.forEach((u) => {
            pessoaRef = collectionPessoaRef.doc(u.id);
          });
          return pessoaRef;
        })
        .then(async (pRef) => {
          await this.collectionCarteiraRef
            .where('pessoa', '==', pRef)
            .where('ativo', '==', true)
            .get()
            .then((c) => {
              c.forEach((c) => {
                carteiraRef = c;
              });
            });
        });

      if (pessoaRef != null && carteiraRef == null) {
        carteira = { ...carteira, pessoa: pessoaRef, ativo: true };

        return this.collectionCarteiraRef.add(carteira);
      } else if (carteiraRef != null) {
        throw new BadRequestException('Carteira ja criada, faça um update');
      } else {
        throw new BadRequestException('Pessoa não encontrado');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async update(userId: number, carteira: any) {
    let pessoaRef = null;
    let carteiraRef = null;
    const collectionPessoaRef = firebase.firestore().collection('pessoa');
    const usuario = collectionPessoaRef.where('id', '==', userId);

    try {
      await usuario
        .get()
        .then((u) => {
          u.forEach(async (u) => {
            pessoaRef = collectionPessoaRef.doc(u.id);
          });
          return pessoaRef;
        })
        .then(async (pRef) => {
          await this.collectionCarteiraRef
            .where('pessoa', '==', pRef)
            .where('ativo', '==', true)
            .get()
            .then((c) => {
              c.forEach((c) => {
                carteiraRef = c;
              });
            });
        });

      if (pessoaRef != null && carteiraRef != null) {
        return this.collectionCarteiraRef.doc(carteiraRef.id).update(carteira);
      } else {
        throw new BadRequestException('Pessoa não encontrada');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async remove(id: string, carteira: any) {
    return this.collectionCarteiraRef.doc(id).update(carteira);
  }
}
