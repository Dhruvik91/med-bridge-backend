import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthService } from './user-auth.service';
import { User } from '../../database/entities/user.entity';
import { UserRole } from '../../database/entities/enums';
import { AllowUnauthorized } from '../auth/unauthorized/allow-unauthorixed';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';

import {
  ApiCreatedResponseEnvelope,
  ApiOkResponseEnvelope,
  ApiPaginatedResponseEnvelope,
  EmptyResponseDto,
} from '../../core/swagger/response-envelope';

import { ForgotPasswordDto, ResetPasswordDto } from './dto/password-reset.dto';

import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

class SignupDto {
  @ApiProperty({ example: 'candidate@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.candidate })
  @IsEnum(UserRole)
  userType: UserRole;
}

@ApiTags('User Auth')
@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly auth: UserAuthService) {}

  @AllowUnauthorized()
  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user (candidate/employer)' })
  @ApiCreatedResponse({ description: 'User registered and JWT returned' })
  async signup(@Body() body: SignupDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.auth.signup(body.email, body.password, body.userType);
    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return result;
  }

  @AllowUnauthorized()
  @UseGuards(AuthGuard('local-user'))
  @Post('login')
  @ApiOperation({ summary: 'Login user and return JWT' })
  @ApiOkResponse({ description: 'Successfully authenticated, returns JWT token' })
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    // req.user is set by Local Strategy
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = (req as any).user;
    const result = await this.auth.login(user);
    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return result;
  }

  @UseGuards(AuthGuard('jwt-user'))
  @Get('me')
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  @ApiOkResponseEnvelope(User)
  async me(@Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = (req as any).user as { id: string };
    return this.auth.me(payload.id);
  }

  @UseGuards(AuthGuard('jwt-user'))
  @Post('logout')
  @ApiOperation({ summary: 'Logout current user and clear auth cookie' })
  @ApiOkResponse({ description: 'Successfully logged out' })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    return { success: true };
  }

  // Initiate Google OAuth
  @AllowUnauthorized()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Initiate Google OAuth login flow' })
  async googleAuth() {
    return;
  }

  // Google OAuth callback
  @AllowUnauthorized()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Handle Google OAuth callback and redirect with JWT' })
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const profile = (req as any).user as { email: string; name?: string };
    const result = await this.auth.upsertGoogleUser({ email: profile.email, name: profile.name });
    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    // Redirect with token as query (frontend should capture and store)
    const redirectUrl = process.env.GOOGLE_FRONTEND_REDIRECT_LINK || 'http://localhost:3001/auth/callback';
    const url = `${redirectUrl}?token=${encodeURIComponent(result.access_token)}`;
    return res.redirect(url);
  }

  @AllowUnauthorized()
  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset email' })
  @ApiOkResponse({ description: 'Password reset email sent if account exists' })
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.auth.forgotPassword(body.email);
  }

  @AllowUnauthorized()
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using token from email' })
  @ApiOkResponse({ description: 'Password successfully reset' })
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.auth.resetPassword(body.token, body.newPassword);
  }
}
