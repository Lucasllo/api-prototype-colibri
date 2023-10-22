import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

export const PasswordCode = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.codigo != undefined) {
      return request.codigo;
    } else {
      throw new BadRequestException('Codigo não encontrado');
    }
  },
);
