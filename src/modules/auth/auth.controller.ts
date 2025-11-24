import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { LocalAuthGuard } from './Guards/local-guard';
import { AuthService } from './auth.service';
import { AllowUnauthorized } from './unauthorized/allow-unauthorixed';
import { ForgotPasswordDto, ResetPasswordDto } from './types/types';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
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
  @ApiOperation({ summary: 'Login with credentials to obtain JWT access token' })
  @ApiOkResponse({ description: 'Successfully authenticated, returns JWT token' })
  login(@Req() req: Request) {
    return this.authService.generateJwtToken(req?.user);
  }

  @AllowUnauthorized()
  @Post('forgot-password')
  @ApiOperation({ summary: 'Trigger forgot password flow by email' })
  @ApiOkResponse({ description: 'Password reset email sent (if account exists)' })
  @ApiBadRequestResponse({ description: 'Invalid email or cannot send email' })
  async forgotPassword(@Body() forgotPassword: ForgotPasswordDto) {
    return await this.authService.forgotPassword(forgotPassword);
  }

  @AllowUnauthorized()
  @Post('reset-password/:token')
  @ApiOperation({ summary: 'Reset password using reset token' })
  @ApiOkResponse({ description: 'Password successfully reset' })
  @ApiBadRequestResponse({ description: 'Invalid or expired token' })
  async resetPassword(
    @Body() resetPassword: ResetPasswordDto,
    @Param('token') token: string,
  ) {
    return await this.authService.resetPassword(resetPassword, token);
  }
}
