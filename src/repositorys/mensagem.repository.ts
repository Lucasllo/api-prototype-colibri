import { Injectable, BadRequestException } from '@nestjs/common';
import * as firebase from 'firebase-admin';
@Injectable()
export class MensagemRepository {
  private collectionMensagemRef: FirebaseFirestore.CollectionReference =
    firebase.firestore().collection('mensagem');

  public async getMensagem(id: string): Promise<any> {
    return this.collectionMensagemRef
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
        throw new BadRequestException(error.message);
      });
  }

  public async getAll(): Promise<firebase.firestore.DocumentData[]> {
    return (await this.collectionMensagemRef.get()).docs.map((doc) =>
      doc.data(),
    );
  }

  public async getAllByUser(
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
          await this.collectionMensagemRef
            .where('pessoa', '==', pessoaRef)
            .get()
        ).docs.map((doc) => doc.data());
      } else {
        throw new BadRequestException('Pessoa não encontrado');
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async create(mensagem, userId: number): Promise<any> {
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
        mensagem = { ...mensagem, pessoa: pessoaRef };

        return this.collectionMensagemRef.add(mensagem);
      } else {
        throw new BadRequestException('Pessoa não encontrado');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async update(userId: number, mensagem: any) {
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
        return await this.collectionMensagemRef
          .where('pessoa', '==', pessoaRef)
          .get()
          .then((u) => {
            u.forEach(async (u) => {
              pessoaRef = await this.collectionMensagemRef
                .doc(u.id)
                .update(mensagem);
            });
          });
      } else {
        throw new BadRequestException('Pessoa não encontrado');
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async remove(id: number, mensagem: any) {
    return this.update(id, mensagem); // verificar a necessidade da propriedade "ativo" na mensagem
  }
}
