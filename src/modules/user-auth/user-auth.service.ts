import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../database/entities/user.entity';
import { UserRole } from '../../database/entities/enums';
import { HashingService } from '../../core/hashing/hashing';

export type JwtPayload = { id: string; email: string; role: UserRole };

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    private readonly hashing: HashingService,
    private readonly jwt: JwtService,
  ) {}

  async signup(email: string, password: string, role: UserRole) {
    const exists = await this.usersRepo.findOne({ where: { email } });
    if (exists) throw new ConflictException('Email already registered');

    const passwordHash = await this.hashing.hash(password);
    const user = this.usersRepo.create({ email, role, passwordHash });
    const saved = await this.usersRepo.save(user);
    const token = this.generateToken({ id: saved.id, email: saved.email, role: saved.role });
    
    // Exclude passwordHash from response
    const { passwordHash: _, ...userWithoutPassword } = saved;
    return { access_token: token, user: userWithoutPassword };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user || !user.passwordHash) return null;
    const match = await this.hashing.compare(password, user.passwordHash);
    if (!match) return null;
    return user;
  }

  generateToken(payload: JwtPayload) {
    return this.jwt.sign(payload);
  }

  async login(user: User) {
    const token = this.generateToken({ id: user.id, email: user.email, role: user.role });
    
    // Exclude passwordHash from response
    const { passwordHash: _, ...userWithoutPassword } = user;
    return { access_token: token, user: userWithoutPassword };
  }

  async upsertGoogleUser(profile: { email: string; name?: string }) {
    const email = profile.email;
    if (!email) throw new UnauthorizedException('Google profile missing email');
    let user = await this.usersRepo.findOne({ where: { email } });
    if (!user) {
      user = this.usersRepo.create({ email, role: UserRole.candidate, passwordHash: null });
      user = await this.usersRepo.save(user);
    }
    return this.login(user);
  }

  async me(userId: string) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) return null;
    
    // Exclude passwordHash from response
    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
