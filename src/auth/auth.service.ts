import { HttpException, Injectable } from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(authDTO: AuthDTO): Promise<{
    access_token: string;
  }> {
    const user = await this.UserService.create(authDTO);
    return await this.payloadGenerator({
      id: user.id,
      username: user.username,
    })
  }

  async login(authDTO: AuthDTO): Promise<{
    access_token: string;
  }> {
    const user = await this.UserService.findOneByUnique({
      username: authDTO.username,
    });

    if (!user) {
      throw new HttpException('Username or Email not registered', 404);
    }

    const isPasswordMatch = await bcrypt.compare(
      authDTO.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException('Invalid password', 401);
    }

    return await this.payloadGenerator({
      id: user.id,
      username: user.username,
    })
  }

  private async payloadGenerator (user: {
    id: string;
    username: string;
  }): Promise< { access_token: string} > {
    return {
      access_token: this.jwtService.sign(user)
    }
  }
}
