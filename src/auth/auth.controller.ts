import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/create-auth.dto';
import { Role } from '../enum/role.enum';
import { RoleGuard } from '../guard/role.guard';

@Roles(Role.Admin)
@UseGuards(RoleGuard)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto): Promise<{ token: string }> {
    return this.authService.login(loginAuthDto);
  }
}
