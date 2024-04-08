import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { FilterQuery, Model } from 'mongoose';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/createUser.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async findOneByUnique({
    id,
    username,
  }: {
    id?: string;
    username?: string;
  }) {
    if (!id && !username) {
      return null;
    }

    const orMethod: FilterQuery<User>[] = [];
    if (id) orMethod.push({ _id: id });
    if (username) orMethod.push({ username });
    const res = await this.userModel.findOne({
      $or: orMethod,
    });
    return res;
  }

  async findByUnique({
    id,
    username
  }: {
    id?: string;
    username?: string;
  }): Promise<UserDTO> {
    const user = await this.findOneByUnique({
      id,
      username,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      id: user.id,
      username: user.username
    };
  }

  async create(user: CreateUserDTO): Promise<UserDTO> {

    const userExistsByUsername = await this.findOneByUnique({ username: user.username })

    if (userExistsByUsername) {
      throw new HttpException(
        'This username already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    const password = await bcrypt.hash(user.password, 10);
    const userCreated = await this.userModel.create({
      ...user,
      password,
    });

    return {
      id: userCreated.id,
      username: userCreated.username
    };
  }
}
