import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PessoaModule } from './pessoa/pessoa.module';
import { CorridaModule } from './corrida/corrida.module';
import { CarteiraModule } from './carteira/carteira.module';
import { MensagemModule } from './mensagem/mensagem.module';
import { UserIdCheckMiddleware } from './middlewares/user-id-check.middleware';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
    PessoaModule,
    CorridaModule,
    CarteiraModule,
    MensagemModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdCheckMiddleware)
      .forRoutes
      // {
      //   path: 'mensagens/:id',
      //   method: RequestMethod.ALL,
      // },
      // {
      //   path: 'corridas/:id',
      //   method: RequestMethod.ALL,
      // },
      // {
      //   path: 'carteira/:id',
      //   method: RequestMethod.ALL,
      // },
      ();
  }
}
