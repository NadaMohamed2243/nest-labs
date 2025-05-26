import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignInDto, SignUpDto } from './dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { GetUser } from 'src/decorators/get-user';
import { jwtPayload } from 'src/lib/interfaces';
import { VerifyRole } from 'src/decorators/verifYRole';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/sign-up')
  signUp(@Body() SignUpDto: SignUpDto) {
    return this.usersService.signUp(SignUpDto);
  }

  @Post('/sign-in')
  signIn(@Body() SignInDto: SignInDto) {
    return this.usersService.signIn(SignInDto);
  }

  @ApiBearerAuth()
  @Get('/my-profile')
  getProfile(@GetUser() user: jwtPayload) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.usersService.getProfile(user.email);
  }

  @ApiBearerAuth()
  @Get('/all')
  getAllUsers(@VerifyRole('admin') user: jwtPayload) {
    if (!user) {
      throw new Error('Unauthorized: Only admin can access this route');
    }
    return this.usersService.getAllUsers(user.email);
  }
}
