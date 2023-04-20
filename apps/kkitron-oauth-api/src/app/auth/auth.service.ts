import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Role, User } from '@kkitron/kkitron-oauth-api/generated/db-types';

import { UsersService } from '../resources/users/users.service';
import { LogInInput } from './dto/log-in-input.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<null | User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isMatched = await bcrypt.compare(password, user.password);
    return isMatched ? user : null;
  }

  async signUp(signUpInput: LogInInput) {
    const { email, password } = signUpInput;
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.usersService.create({
      email,
      password: hashedPassword,
      role: Role.User,
    });
  }
}
