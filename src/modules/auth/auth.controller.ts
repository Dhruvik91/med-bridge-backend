import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { LocalAuthGuard } from './Guards/local-guard';
import { AuthService } from './auth.service';
import { AllowUnauthorized } from './unauthorized/allow-unauthorixed';
import { ForgotPasswordDto, ResetPasswordDto } from './types/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Function For User Login
   * @param req
   * @returns { "access_token" : "JwtToken"}
   */
  @AllowUnauthorized()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request) {
    return this.authService.generateJwtToken(req?.user);
  }

  @AllowUnauthorized()
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPassword: ForgotPasswordDto) {
    return await this.authService.forgotPassword(forgotPassword);
  }

  @AllowUnauthorized()
  @Post('reset-password/:token')
  async resetPassword(
    @Body() resetPassword: ResetPasswordDto,
    @Param('token') token: string,
  ) {
    return await this.authService.resetPassword(resetPassword, token);
  }
}
