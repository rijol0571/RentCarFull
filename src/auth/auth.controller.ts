import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/sign_up.dto';
import { SignInAuthDto } from './dto/sign_in.dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { AccessTokenGuard } from './common/guards/accessToken';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('sign-up')
  signUp(@Body() createAuthDto: SignUpAuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('sign-in')
  signIn(@Body() createAuthDto: SignInAuthDto) {
    return this.authService.signIn(createAuthDto);
  }
  @Post('forget-password')
  forgetPassword(@Body() email:string) {
    return this.authService.forgetPassword(email);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: { token: string; newPassword: string }) {
    return this.authService.resetPassword(resetPasswordDto.token, resetPasswordDto.newPassword);
  }
  

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll() {
    return this.authService.findAll();
  }
  @UseGuards(AccessTokenGuard)  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }
  @UseGuards(AccessTokenGuard)  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: SignInAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }
  @UseGuards(AccessTokenGuard)  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
