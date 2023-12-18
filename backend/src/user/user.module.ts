import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CustomJwtService } from 'src/user/strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({}), PassportModule.register({ defaultStrategy: '42' })],
  controllers: [UserController],
  providers: [UserService, CustomJwtService, JwtStrategy],

})
export class UserModule {}
