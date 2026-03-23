import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../database/entities/user.entity';
import { UserRole } from '../../database/entities/enums';
import { HashingService } from '../../core/hashing/hashing';
import { MailerService } from '../mailer/mailer.service';
import { AuthProvider } from '../users/dto/create-user.dto';

export type JwtPayload = { id: string; email: string; userType: UserRole };

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    private readonly hashing: HashingService,
    private readonly jwt: JwtService,
    private readonly mailerService: MailerService,
  ) { }

  async signup(email: string, password: string, userType: UserRole) {
    const exists = await this.usersRepo.findOne({ where: { email } });
    if (exists) throw new ConflictException('Email already registered');

    const passwordHash = await this.hashing.hash(password);
    const user = this.usersRepo.create({ 
      email, 
      userType, 
      passwordHash,
      provider: AuthProvider.LOCAL,
      isVerified: false,
      isActive: true
    });
    const saved = await this.usersRepo.save(user);
    const token = this.generateToken({ id: saved.id, email: saved.email, userType: saved.userType });

    return { access_token: token, user: saved };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user || user.provider !== AuthProvider.LOCAL || !user.passwordHash) return null;
    const match = await this.hashing.compare(password, user.passwordHash);
    if (!match) return null;
    return user;
  }

  generateToken(payload: JwtPayload) {
    return this.jwt.sign(payload);
  }

  async login(user: User) {
    const token = this.generateToken({ id: user.id, email: user.email, userType: user.userType });
    return { access_token: token, user: user };
  }

  async upsertGoogleUser(profile: { email: string; name?: string }) {
    const email = profile.email;
    if (!email) throw new UnauthorizedException('Google profile missing email');
    let user = await this.usersRepo.findOne({ where: { email } });
    if (!user) {
      user = this.usersRepo.create({ 
        email, 
        userType: UserRole.candidate, 
        passwordHash: null,
        provider: AuthProvider.GOOGLE,
        isVerified: true,
        isActive: true
      });
      user = await this.usersRepo.save(user);
    } else if (user.provider !== AuthProvider.GOOGLE) {
      throw new ConflictException('User already registered with a different provider');
    }
    return this.login(user);
  }

  async me(userId: string) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user || user.provider !== AuthProvider.LOCAL) {
      return { message: 'If an account with that email exists, a password reset link has been sent.' };
    }

    const resetToken = randomBytes(32).toString('hex');
    const resetTokenHash = await this.hashing.hash(resetToken);

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    user.passwordResetToken = resetTokenHash;
    user.passwordResetExpires = expiresAt;
    await this.usersRepo.save(user);

    await this.mailerService.sendPasswordResetEmail(email, resetToken);

    return { message: 'If an account with that email exists, a password reset link has been sent.' };
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const users = await this.usersRepo
      .createQueryBuilder('user')
      .where('user.passwordResetToken IS NOT NULL')
      .andWhere('user.passwordResetExpires > :now', { now: new Date() })
      .getMany();

    let matchedUser: User | null = null;
    for (const user of users) {
      if (user.passwordResetToken) {
        const isMatch = await this.hashing.compare(token, user.passwordResetToken);
        if (isMatch) {
          matchedUser = user;
          break;
        }
      }
    }

    if (!matchedUser) {
      throw new BadRequestException('Invalid or expired password reset token');
    }

    matchedUser.passwordHash = await this.hashing.hash(newPassword);
    matchedUser.passwordResetToken = null;
    matchedUser.passwordResetExpires = null;
    await this.usersRepo.save(matchedUser);

    return { message: 'Password has been reset successfully. You can now log in with your new password.' };
  }
}
import { NotFoundException } from '@nestjs/common';
