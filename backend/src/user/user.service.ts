import { ConflictException, Injectable } from '@nestjs/common';
import { CustomJwtService } from 'src/user/strategy';
import { PrismaService } from 'src/prisma/prisma.service';

import { ForbiddenException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthDtoSignIn } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { authenticator } from 'otplib';

@Injectable()
export class UserService {
  private readonly defaultImageUrl =
    'https://res.cloudinary.com/drmpknxzb/image/upload/v1696507058/cmsytd8ax8qbxqhzxdzo.png';

  constructor(
    private prisma: PrismaService,
    private customJwtService: CustomJwtService,
    private customjwt: JwtService,
    private config: ConfigService
  ) {}

  /* **************
   ** Public method*
   ** *************/

  getUserFromToken(JwtToken: string | string[]) {
    return this.customJwtService.decodeJwtToken(Array.isArray(JwtToken) ? JwtToken[0] : JwtToken);
  }

  async createUser(userData: any) {
    let hash: string;
    if (userData.password) hash = await argon.hash(userData.password);
    try {
      return await this.prisma.user.create({
        data: {
          email: userData.email,
          nickname: userData.nickname,
          fullName: userData.fullName,
          imageUrl: userData.imageUrl || this.defaultImageUrl,
          hash,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        const meta = error.meta as any;
        throw new ConflictException(`A user with that ${meta.target} already exists.`);
      }
      throw error;
    }
  }

  async signin(dto: AuthDtoSignIn) {
    const user = await this.findUserByEmail(dto.email);
    await this.checkCurrentPassword(dto.password, user);
    return this.signToken(user.id);
  }

  async checkCurrentPassword(currentPassword: string, user: User): Promise<void> {
    const pwdMatches = await argon.verify(user.hash, currentPassword);
    if (!pwdMatches) throw new UnauthorizedException('Incorrect password');
  }

  async signToken(userId: string): Promise<{ access_token: string }> {
    const payload = { sub: userId };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.customjwt.signAsync(payload, { expiresIn: '1000m', secret });
    return { access_token: token };
  }

  async findAllUsersExceptDefault(): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: {
        NOT: [{ nickname: '__defaultUser__' }],
      },
    });
  }

  async getUserInfobyId(userId: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  /* ****************
   ** Private method*
   ** **************/

  private async findUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
