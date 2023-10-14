import { Module } from '@nestjs/common';
import { FileController } from '../controllers/file.controller';
import { FileService } from '../services/file.service';
import { PessoaModule } from './pessoa.module';

@Module({
  imports: [PessoaModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
