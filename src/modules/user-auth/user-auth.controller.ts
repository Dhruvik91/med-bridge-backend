import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserAuthService } from './user-auth.service';
import { UserRole } from '../../database/entities/enums';
import { AllowUnauthorized } from '../auth/unauthorized/allow-unauthorixed';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

class SignupDto {
  email: string;
  password: string;
  role: UserRole;
  name?: string;
}

@ApiTags('User Auth')
@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly auth: UserAuthService) {}

  @AllowUnauthorized()
  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user (doctor/hospital)' })
  @ApiCreatedResponse({ description: 'User registered and JWT returned' })
  async signup(@Body() body: SignupDto) {
    return this.auth.signup(body.email, body.password, body.role, body.name);
  }

  @AllowUnauthorized()
  @UseGuards(AuthGuard('local-user'))
  @Post('login')
  @ApiOperation({ summary: 'Login user and return JWT' })
  @ApiOkResponse({ description: 'Successfully authenticated, returns JWT token' })
  async login(@Req() req: Request) {
    // req.user is set by Local Strategy
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = (req as any).user;
    return this.auth.login(user);
  }

  @UseGuards(AuthGuard('jwt-user'))
  @Get('me')
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  @ApiOkResponse({ description: 'Returns user information for current JWT' })
  async me(@Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = (req as any).user as { id: string };
    return this.auth.me(payload.id);
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
    // Redirect with token as query (frontend should capture and store)
    const redirectUrl = process.env.FRONTEND_GOOGLE_REDIRECT || 'http://localhost:3001/auth/callback';
    const url = `${redirectUrl}?token=${encodeURIComponent(result.access_token)}`;
    return res.redirect(url);
  }
}
