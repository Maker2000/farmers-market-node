import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../domain/user.dto';
import { User } from '../domain/user.schema';
import { ClientValidationHelper } from 'src/util/validation-helper.util';
import { genSalt, hash } from 'bcrypt';
import { CreateUserResponse } from '../domain/create-user.response';
import { JwtService } from '@nestjs/jwt';
import { AuthJWT } from 'src/guards/auth/auth.guard';
import '../../../extensions/promise.extension';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async createUser(dto: CreateUserDto): Promise<CreateUserResponse> {
    let existingUser = await this.userModel.findOne({
      $or: [
        { userName: { $eq: dto.userName, $ne: null, $exists: true } },
        { email: { $eq: dto.email, $ne: null, $exists: true } },
      ],
    });
    ClientValidationHelper.requireNull(
      existingUser,
      'Sign-up Failure',
      'User with the same email and/or username already exists.',
    );
    const salt = await genSalt(15);
    let newPassword = await hash(dto.password, salt);

    let createdUser = await this.userModel.create({
      ...dto,
      password: newPassword,
    });
    const payload = <AuthJWT>{
      username: createdUser.userName,
      token: new Date().valueOf().toString(),
    };
    let token = await this.jwtService.signAsync(payload);
    return {
      user: createdUser,
      token: token,
    };
  }
  async getUserById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id);
  }
  private async tryGetUserByUserName(
    username: string,
  ): Promise<User | undefined> {
    return this.userModel.findOne({
      userName: username,
    });
  }
  getUserByUserName(username: string): Promise<User> {
    return this.tryGetUserByUserName(username).requireEntityFound(
      'User not found',
    );
  }
}
