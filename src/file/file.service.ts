import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class FileService {
  async photo(
    user,
    files: {
      foto_perfil: Express.Multer.File;
      foto_cnh: Express.Multer.File;
      foto_clrv: Express.Multer.File;
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
      `photo_perfil_${user.id}.jpeg`,
    );

    const path_clrv = join(
      __dirname,
      '..',
      '..',
      'storage',
      'foto_CLRV',
      `photo_perfil_${user.id}.jpeg`,
    );

    await writeFile(path_perfil, files.foto_perfil[0].buffer);
    await writeFile(path_cnh, files.foto_cnh[0].buffer);
    return await writeFile(path_clrv, files.foto_clrv[0].buffer);
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
  }

  async fotoCNH(user, file: Express.Multer.File) {
    const path_cnh = join(
      __dirname,
      '..',
      '..',
      'storage',
      'foto_CNH',
      `photo_perfil_${user.id}.jpeg`,
    );

    return await writeFile(path_cnh, file.buffer);
  }

  async fotoCLRV(user, file: Express.Multer.File) {
    const path_clrv = join(
      __dirname,
      '..',
      '..',
      'storage',
      'foto_CLRV',
      `photo_perfil_${user.id}.jpeg`,
    );

    return await writeFile(path_clrv, file.buffer);
  }
}
