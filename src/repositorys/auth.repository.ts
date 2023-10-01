import { LoginAuthDto } from '../dto/auth/create-auth.dto';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as firebase from 'firebase-admin';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthRepository {
  private issuer = 'login';
  private audience = 'user';
  private _collectionRef: FirebaseFirestore.CollectionReference = firebase
    .firestore()
    .collection('pessoa');

  constructor(private readonly jwtService: JwtService) {}

  async createToken(pessoa) {
    return {
      token: this.jwtService.sign(
        {
          nome: pessoa.nome,
          email: pessoa.email,
        },
        {
          expiresIn: '7 days',
          subject: String(pessoa.id),
          issuer: this.issuer,
          audience: this.audience,
          // notBefore: -> só fica valido apos essa data;
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async login({
    login,
    senha,
  }: LoginAuthDto): Promise<{ token: string }> {
    let result = null;
    const usuario = this._collectionRef
      .where('email', '==', login)
      .where('ativo', '==', true);
    await usuario.get().then((u) => {
      u.forEach((u) => {
        result = u.data();
      });
    });

    if (result != null) {
      const usuario = this._collectionRef
        .where('telefone', '==', login)
        .where('ativo', '==', true);
      await usuario.get().then((u) => {
        u.forEach((u) => {
          result = u.data();
        });
      });
    }

    if (result != null && (await bcrypt.compare(senha, result.senha))) {
      return this.createToken(result);
    } else {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }
  }
}
