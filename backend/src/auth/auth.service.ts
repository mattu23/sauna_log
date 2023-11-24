import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './DTO/create-user.dto';
import { CredentialsDTO } from './DTO/credentials.dto';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { error } from 'console';
import { updateUserDTO } from './DTO/update-user.dto';
import { updatePasswordDTO } from './DTO/update-password.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  //新規ユーザー登録：UserRepositoryを介してデータベースに保存
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }

  //ユーザーログイン
  async signIn(credentialsDto: CredentialsDTO, req: Request): Promise<{ message: string }> {
    const { email, password } = credentialsDto;
    const user = await this.userRepository.findOne({ where: { email } });
    //パスワードが一致したらセッションにユーザーIDを保存
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.userId = user.id;
      return { message: 'ログインに成功しました' };
    }
    console.error(error);
    throw new UnauthorizedException('ログイン情報が正しくありません');
  }

  //ログインユーザーの特定
  async getUserById(userId: number): Promise<User> {
    return await this.userRepository.findOne({id: userId });
  }

  //ログアウト
  async signOut(req: Request): Promise<{ message: string }> {
    return new Promise((resolve, reject) => { req.session.destroy(err => {
        if (err) {
          reject(err);
        } else {
          resolve({ message: 'ログアウトしました' });
        }
      });
    });
  }


  //ユーザー名・アドレスの編集
  async updateUserData(userId: number, updateUserDTO: updateUserDTO) {
    const user = await this.getUserById(userId)
    user.username = updateUserDTO.username;
    user.email = updateUserDTO.email;
    return this.userRepository.save(user);
  }

  //パスワードの編集
  async updateUserPassword(userId: number, updatePasswordDTO: updatePasswordDTO) {
    const user = await this.getUserById(userId)
    const hashPassword = await bcrypt.hash(updatePasswordDTO.password, 10);
    user.password = hashPassword;
    return this.userRepository.save(user);
  }

  //ユーザーの削除
  async deleteUser(userId: number) {
    const user = await this.getUserById(userId)
    return this.userRepository.remove(user);
  }
}

