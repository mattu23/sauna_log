import { Body, Controller, Post, Req, Get, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { CredentialsDTO } from './DTO/credentials.dto';
import { updateUserDTO } from './DTO/update-user.dto';
import { updatePasswordDTO } from './DTO/update-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //ユーザー新規登録
  @Post('signup')
  async signup(@Body() CreateUserDto: CreateUserDto): Promise<User> {
    return await this.authService.signUp(CreateUserDto);
  }

  //ユーザーのログイン
  @Post('login')
  async signin(@Body() credentialsDto: CredentialsDTO, @Req() req: Request) {
    return await this.authService.signIn(credentialsDto, req)
  }

  //ログイン時しているユーザーの情報取得（Fetchで使用）
  @Get('user')
  async getUser(@Req() req:Request): Promise<User> {
    const user = await this.authService.getUserById(req.session.userId);
    return user;
  }

  //ユーザーのログアウト
  @Post('logout')
  async logout(@Req() req: Request) {
    return this.authService.signOut(req);
  }

  //ユーザー名・登録アドレスの変更
  @Put('updateUserData/:userId')
  async updateUserData(@Param('userId', ParseIntPipe) userId: number, @Body() updateUserDTO: updateUserDTO) {
    return this.authService.updateUserData(userId, updateUserDTO);
  }

  //パスワードの変更
  @Put('updateUserPassword/:userId') 
  async updateUserPassword(@Param('userId', ParseIntPipe) userId: number, @Body() updatePasswordDTO: updatePasswordDTO) {
    return this.authService.updateUserPassword(userId, updatePasswordDTO);
  }
  
  //ユーザーの削除
  @Delete('delete/:userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.authService.deleteUser(userId);
  }
}
