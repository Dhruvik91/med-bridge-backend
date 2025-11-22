import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { LocalStrategy } from './local-strategy';
import { JwtStrategy } from './jwt-strategy';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashingService } from 'src/core/hashing/hashing';
import { NotificationService } from '../notification/notification.service';
import { EncryptionService } from 'src/core/crypto/crypto-service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_TOKEN_EXPIRY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    HashingService,
    NotificationService,
    ConfigService,
    EncryptionService,
  ],
})
export class AuthModule {}
