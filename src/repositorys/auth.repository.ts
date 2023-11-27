import { LoginAuthDto } from '../dto/auth/create-auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import * as bcrypt from 'bcrypt';
import { Pessoa } from 'src/entities/pessoa.entity';

@Injectable()
export class AuthRepository {
  private collectionPessoaRef: FirebaseFirestore.CollectionReference = firebase
    .firestore()
    .collection('pessoa');

  public async login({ login, senha }: LoginAuthDto): Promise<any> {
    let result = null;
    const usuario = this.collectionPessoaRef.where('email', '==', login);
    await usuario.get().then((u) => {
      u.forEach((u) => {
        result = u.data();
      });
    });

    if (result == null) {
      const usuario = this.collectionPessoaRef.where('telefone', '==', login);
      await usuario.get().then((u) => {
        u.forEach((u) => {
          result = u.data();
        });
      });
    }

    if (result != null && (await bcrypt.compare(senha, result.senha))) {
      return result;
    } else {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }
  }

  public async create(pessoa: Pessoa) {
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
      await this.collectionPessoaRef.add(pessoa);

      return pessoa;
    }
  }

  public async recoverPassword({ login }): Promise<{ token: string }> {
    let result = null;
    const usuario = this.collectionPessoaRef.where('email', '==', login);
    await usuario.get().then((u) => {
      u.forEach((u) => {
        result = u.data();
      });
    });

    if (result == null) {
      const usuario = this.collectionPessoaRef.where('telefone', '==', login);
      await usuario.get().then((u) => {
        u.forEach((u) => {
          result = u.data();
        });
      });
    }

    if (result != null) {
      return result;
    } else {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }
  }
}
