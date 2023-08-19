import { Controller, Get, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login-auth-dto';
import { RegistrationDTO } from './dto/register-auth.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  getProfile(@User() user) {
    return this.authService.getProfile(user)
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  register(@Body() createAuthDto: RegistrationDTO) {
    return this.authService.register(createAuthDto);
  }

}
