import {
  BadRequestException,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { PessoaService } from './pessoa.service';
import { createReadStream, existsSync } from 'fs';

@Injectable()
export class FileService {
  constructor(private readonly pessoaService: PessoaService) {}

  async photo(
    user,
    files: {
      foto_perfil: Express.Multer.File;
      foto_cnh: Express.Multer.File;
      foto_clrv: Express.Multer.File;
      foto_antecedentes: Express.Multer.File;
    },
  ) {
    const path_perfil = join(
      __dirname,
      '..',
      '..',
      'storage',
      'foto_perfil',
      `photo_perfil_${user.id}.jpeg`,
    );

    const path_cnh = join(
      __dirname,
      '..',
      '..',
      'storage',
      'foto_CNH',
      `photo_cnh_${user.id}.jpeg`,
    );

    const path_clrv = join(
      __dirname,
      '..',
      '..',
      'storage',
      'foto_CLRV',
      `photo_clrv_${user.id}.jpeg`,
    );

    const path_antecedentes = join(
      __dirname,
      '..',
      '..',
      'storage',
      'foto_antecedentes',
      `photo_antecedentes${user.id}.jpeg`,
    );

    await writeFile(path_perfil, files.foto_perfil[0].buffer);
    await writeFile(path_cnh, files.foto_cnh[0].buffer);
    await writeFile(path_clrv, files.foto_clrv[0].buffer);
    await writeFile(path_antecedentes, files.foto_antecedentes[0].buffer);
    await this.pessoaService.updateImage(
      user.id,
      'perfilImagem',
      `photo_perfil_${user.id}.jpeg`,
    );
    await this.pessoaService.updateImage(
      user.id,
      'CHNImagem',
      `photo_cnh_${user.id}.jpeg`,
    );
    await this.pessoaService.updateImage(
      user.id,
      'antecedentesImagem',
      `foto_antecedentes${user.id}.jpeg`,
    );
    return await this.pessoaService.updateImage(
      user.id,
      'CLRVImagem',
      `photo_clrv_${user.id}.jpeg`,
    );
  }

  async fotoPerfil(user, file: Express.Multer.File) {
    const path_perfil = join(
      __dirname,
      '..',
      '..',
      'storage',
      'foto_perfil',
      `photo_perfil_${user.id}.jpeg`,
    );

    await writeFile(path_perfil, file.buffer);
    return await this.pessoaService.updateImage(
      user.id,
      'perfilImagem',
      `photo_perfil_${user.id}.jpeg`,
    );
  }

  async fotoCNH(user, file: Express.Multer.File) {
    const path_cnh = join(
      __dirname,
      '..',
      '..',
      'storage',
      'foto_CNH',
      `photo_cnh_${user.id}.jpeg`,
    );

    await writeFile(path_cnh, file.buffer);
    return await this.pessoaService.updateImage(
      user.id,
      'CHNImagem',
      `photo_cnh_${user.id}.jpeg`,
    );
  }

  async fotoCLRV(user, file: Express.Multer.File) {
    const path_clrv = join(
      __dirname,
      '..',
      '..',
      'storage',
      'foto_CLRV',
      `photo_clrv_${user.id}.jpeg`,
    );

    await writeFile(path_clrv, file.buffer);
    return await this.pessoaService.updateImage(
      user.id,
      'CLRVImagem',
      `photo_clrv_${user.id}.jpeg`,
    );
  }

  async getFotoCLRV(idUser) {
    const path_clrv = join(
      __dirname,
      '..',
      '..',
      'storage',
      'foto_CLRV',
      `photo_clrv_${idUser}.jpeg`,
    );

    const existe = existsSync(path_clrv);

    if (existe) {
      const file = createReadStream(path_clrv);
      return new StreamableFile(file);
    } else {
      throw new BadRequestException('Imagem não encontrada');
    }
  }

  async getFotoCNH(idUser) {
    const path_cnh = join(
      __dirname,
      '..',
      '..',
      'storage',
      'foto_CNH',
      `photo_cnh_${idUser}.jpeg`,
    );

    const existe = existsSync(path_cnh);

    if (existe) {
      const file = createReadStream(path_cnh);
      return new StreamableFile(file);
    } else {
      throw new BadRequestException('Imagem não encontrada');
    }
  }

  async getFotoPerfil(user) {
    const path_perfil = join(
      __dirname,
      '..',
      '..',
      'storage',
      'foto_perfil',
      `photo_perfil_${user.id}.jpeg`,
    );

    const existe = existsSync(path_perfil);

    if (existe) {
      const file = createReadStream(path_perfil);
      return new StreamableFile(file);
    } else {
      throw new BadRequestException('Imagem não encontrada');
    }
  }
}
