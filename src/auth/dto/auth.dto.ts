import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDTO {

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
