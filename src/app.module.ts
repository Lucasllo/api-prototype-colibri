import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PessoaModule } from './pessoa/pessoa.module';
import { CorridaModule } from './corrida/corrida.module';
import { CarteiraModule } from './carteira/carteira.module';
import { MensagemModule } from './mensagem/mensagem.module';
import { UserIdCheckMiddleware } from './middlewares/user-id-check.middleware';

@Module({
  imports: [PessoaModule, CorridaModule, CarteiraModule, MensagemModule],
  controllers: [],
  providers: [],
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
