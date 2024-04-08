import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { HttpResponseInterface } from 'src/@interceptors/http-transformer.interceptor';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() authDTO: AuthDTO): Promise<
    HttpResponseInterface<{
      access_token: string;
    }>
  > {
    const tokenResponse = await this.authService.register(authDTO);
    return {
      status: true,
      statusCode: HttpStatus.CREATED,
      response: tokenResponse,
    };
  }

  @Public()
  @Post('login')
  async login(@Body() authDTO: AuthDTO): Promise<
    HttpResponseInterface<{
      access_token: string;
    }>
  > {
    const tokenResponse = await this.authService.login(authDTO);

    return {
      status: true,
      statusCode: HttpStatus.OK,
      response: tokenResponse,
    };
  }
}
