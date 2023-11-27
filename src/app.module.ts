import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PessoaModule } from './modules/pessoa.module';
import { CorridaModule } from './modules/corrida.module';
import { CarteiraModule } from './modules/carteira.module';
import { MensagemModule } from './modules/mensagem.module';
import { UserIdCheckMiddleware } from './middlewares/user-id-check.middleware';
import { AuthModule } from './modules/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './services/auth.service';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './modules/file.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './services/tasks.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
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
    FileModule,
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
    TasksService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes();
  }
}
