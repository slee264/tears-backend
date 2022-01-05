import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Response } from 'express';

import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Res() response: Response) {
    const token = await this.authService.login(req.user);
    response.cookie('access_token', token, {
      httpOnly: true,
    }).send({ user_id: req.user._id });
  }


  @Get('auth/logout')
  async logout(@Request() req, @Res() response: Response) {
    response.cookie('access_token', '', {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 1000),
    }).send({ success: true })
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
