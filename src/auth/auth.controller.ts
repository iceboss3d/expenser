import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { UserRequestDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() data: UserRequestDto, @Res() response: Response) {
    const result = await this.authService.register(data);
    response.status(result.statusCode).send(result);
    return;
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: UserRequestDto, @Res() response: Response) {
    const result = await this.authService.login(data)
    response.status(result.statusCode).send(result);
    return;
  }
}
