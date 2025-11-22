import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { PropertyOwner } from 'src/database/entities/property-owner';
import { SuperAdmin } from 'src/database/entities/super-admin';
import { HashingService } from 'src/core/hashing/hashing';
import { EncryptionService } from 'src/core/crypto/crypto-service';
import { ResetToken } from 'src/database/entities/reset-token';
import { NotificationService } from '../notification/notification.service';
import { cif } from 'src/database/errors/tryQuery';
import { isQueryFailedError } from 'src/database/errors/query-failed.type-guard';

import {
  ForgotPasswordDto,
  PayloadDataResponse,
  ROLES,
  ResetPasswordDto,
} from './types/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(SuperAdmin)
    private readonly superAdminRepo: Repository<SuperAdmin>,
    @InjectRepository(PropertyOwner)
    private readonly propertyOwnerRepo: Repository<PropertyOwner>,
    @InjectRepository(ResetToken)
    private readonly resetTokenRepo: Repository<ResetToken>,
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
    private readonly mailerService: NotificationService,
    private readonly configService: ConfigService,
    private readonly encryptionService: EncryptionService,
  ) {}

  /**
   * Function to Find User ( Property Owner or Super Admin)
   * @param email
   * @param password
   * @returns { PayloadDataResponse || null }
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<PayloadDataResponse | null> {
    const superAdmin = await this.superAdminRepo.findOneBy({
      email: email,
    });

    if (superAdmin) {
      const IsMatch = await this.hashingService.compare(
        password,
        superAdmin.password,
      );
      if (IsMatch) {
        const { id, email } = superAdmin;
        return { id, email, role: ROLES.SUPER_ADMIN };
      }
    }

    const propertyOwner = await this.propertyOwnerRepo.findOneBy({
      email,
    });

    if (propertyOwner) {
      const IsMatch = await this.hashingService.compare(
        password,
        propertyOwner.password,
      );

      if (IsMatch) {
        const { id, name, email } = propertyOwner;
        return { id, name, email, role: ROLES.PROPERTY_OWNER };
      }
    }
    return null;
  }

  generateJwtToken(user: PayloadDataResponse) {
    return {
      access_token: this.jwtService.sign({ ...user }),
    };
  }

  /**
   * Function to send mail for password reset
   * @param {ForgotPasswordDto} forgotPassword
   */
  async forgotPassword(forgotPassword: ForgotPasswordDto) {
    const user = await this.propertyOwnerRepo.findOneBy({
      email: forgotPassword?.email,
    });

    if (!user) {
      return;
    }

    const resetTokenString =
      this.configService.get<string>('RESET_TOKEN_STRING');

    const userData = `${user?.email}--${resetTokenString}`;

    const encryptedString = this.encryptionService.encryptData(userData);

    await this.resetTokenRepo.insert({
      reset_token: encryptedString,
    });

    const frontEndLink = this.configService.get<string>('FRONTEND_LINK');

    const mailData = {
      to: 'trynew008@gmail.com',
      subject: 'Reset Password',
      htmlBody: `<h1>Click here on this link: ${frontEndLink}/${encryptedString}</h1>`,
    };

    this.mailerService.sendMail(mailData);
  }

  /**
   * Function to reset password
   * @param {ResetPasswordDto} resetPassword
   * @param {string} token
   */
  async resetPassword(resetPassword: ResetPasswordDto, token: string) {
    try {
      const userData = this.encryptionService.decryptData(token).split('--');

      await this.resetTokenRepo
        .findOneByOrFail({ reset_token: token })
        .catch(() => {
          new UnauthorizedException('Unauthorized');
        });

      const user = await this.propertyOwnerRepo
        .findOneByOrFail({
          email: userData[0],
        })
        .catch(
          cif(isQueryFailedError, new NotFoundException("User Doesn't Exists")),
        );

      const password = await this.hashingService.hash(resetPassword?.password);

      if (user) {
        await this.propertyOwnerRepo
          .update(user?.id, { password: password })
          .catch(
            cif(
              isQueryFailedError,
              new NotFoundException("User Doesn't Exists"),
            ),
          );
      }

      await this.resetTokenRepo.delete({ reset_token: token });
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
