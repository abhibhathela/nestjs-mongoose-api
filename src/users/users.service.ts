import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PaginateModel } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: PaginateModel<User>,
  ) {}

  saltOrRounds = 10;

  async findByEmail(email: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async create(user: User): Promise<User> {
    const hash = await bcrypt.hash(user.password, this.saltOrRounds);
    user.password = hash;
    return this.userModel.create(user);
  }
}
