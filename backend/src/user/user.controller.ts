import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { ForbiddenException, HttpCode, InternalServerErrorException, Redirect, Res } from '@nestjs/common';
import { AuthDtoSignIn, AuthDtoSignUp, DtoUpdateUserInfo, DtoUrl } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUser } from './decorator/get-user.decorator';
import { Prisma, User } from '@prisma/client';
import { JwtAuthGuard } from './guard';
import axios from 'axios';
import fetch from 'node-fetch';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { resolveObjectURL } from 'buffer';
import * as argon from 'argon2';
import { toDataURL } from 'qrcode';
import { authenticator } from 'otplib';

@Controller('user')
export class UserController {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    if (user) {
      return user;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('userById')
  getUserById(@Body() user: User) {
    if (user) {
      return this.userService.getUserInfobyId(user.id)
    }
    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAll(@GetUser() user: User) {
    const users = await this.prisma.user.findMany({
      where: {
        NOT: [{ id: user.id }, { nickname: '__defaultUser__' }],
      },
    });

    return users;
  }

  @Post('signup')
  async signup(@Body() data: AuthDtoSignUp) {
    try {
      const userCreated = await this.userService.createUser(data);

      return userCreated;
    } catch (error) {
      throw error;
    }
  }

  @Post('signin')
  async signin(@Body() dto: AuthDtoSignIn, @Res() res) {
    try {
      let userConnected = await this.userService.signin(dto);

      res.cookie('jwt', userConnected.access_token, { httpOnly: false, secure: false });
      return res.status(200).send({ ok: true });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof UnauthorizedException) {
        return res.status(401).send({ error: error.message });
      }
      return res.status(500).send({ error: 'Something went wrong' });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@GetUser() user: User, @Res() res: Response) {
    try {
      res.clearCookie('jwt', { httpOnly: false, secure: false });
      return res.status(200).send({ ok: true });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      }
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('tennis')
  async turnOff2FA(@GetUser() user: User, @Body() data: any,@Res() res: Response) {
    // Update is2FAuthEnabled to false
    console.log(data)
    await this.prisma.game.create({
      data: {
        name: data.question,
        },
      });

    return res.status(200).send({ ok: true, message: data });
  }

  @UseGuards(JwtAuthGuard)
  @Get('closingWindow')
  async closingWindow(@GetUser() user: User, @Res() res: Response) {
    return res.status(200).send({ ok: true });
  }

  @UseGuards(JwtAuthGuard)
  @Post('changeSettings')
  async changeSettings(@GetUser() user: User, @Body() body: DtoUpdateUserInfo) {
    console.log('BODY received in changeSettings', body.fullName);
    console.log('USER received in changeSettings', user);
    try {
      const user_db = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          fullName: body.fullName,
          email: body.email,
          nickname: body.nickname,
        },
      });
      console.log('userdb: ', user_db);
      return user_db;
    } catch (error) {
      console.log('ERROR changing SETTINGS', error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('updateAvatar')
  async updateAvatar(@GetUser() user: User, @Body() body: DtoUrl) {
    console.log('ENTER UPDATE AVATAR');
    console.log('body', body.imageUrl);
    try {
      const user_db = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          imageUrl: body.imageUrl,
        },
      });
      console.log('userdb: ', user_db);
      return user_db;
    } catch (error) {
      console.log('ERROR changing SETTINGS', error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkCurrentPassword')
  async checkCurrentPassword(@Body() currentPassword: any, @GetUser() user: User, @Res() res: Response) {
    console.log('ENTER CHECK CURRENT PASSWORD');
    console.log('USER', user);
    console.log('currentpassword', currentPassword.currentPassword);
    try {
      await this.userService.checkCurrentPassword(currentPassword.currentPassword, user);
    } catch (error) {
      console.log('catching error');
      throw new UnauthorizedException('Incorrect password');
    }
    return res.status(200).send({ ok: true });
  }
}
