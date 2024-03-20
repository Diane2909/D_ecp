import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
  Request,
  Patch,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/registration-step-one.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { Request as ExpressRequest } from 'express';
import { RegistrationStepTwoDto } from './dto/registration-step-two.dto';
import { RegistrationStepThreeDto } from './dto/registration-step-three.dto';
import { RegistrationStepFourDto } from './dto/registration-step-four.dto';
import { User } from './user.model';
import { ForbiddenException } from './exceptions/exceptions';
import { InternalServerErrorException } from '@nestjs/common';

// @UseGuards(AuthGuard('jwt'))
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('register')
  // async register(@Body() createUserDto: CreateUserDto) {
  //   try {
  //     await this.authService.register(createUserDto);
  //     return { message: 'Utilisateur enregistré avec succès.' };
  //   } catch (error) {
  //     if (error instanceof BadRequestException) {
  //       return { message: 'Les données fournies ne sont pas valides.' };
  //     }
  //     throw error;
  //   }
  // }

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string; user: User }> {
    const existingUser = await this.authService.validateUserByEmailOrUsername(
      createUserDto.email,
      createUserDto.username,
    );
    if (existingUser) {
      throw new BadRequestException(
        'Un utilisateur avec cet email ou nom d’utilisateur existe déjà.',
      );
    }

    const { user, accessToken } =
      await this.authService.register(createUserDto);
    return { user, accessToken };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.authService.login(username, password);
    return { user };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req) {
    const user = req.user as User;
    console.log(user);
    return user;
  }

  @Get('checkAuth')
  checkAuth(@Req() req: ExpressRequest): { isAuthenticated: boolean } {
    const authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader);

    let isAuthenticated = false;
    if (authorizationHeader) {
      const [bearer, token] = authorizationHeader.split(' ');
      if (bearer === 'Bearer' && token) {
        isAuthenticated = true;
      }
    }
    return { isAuthenticated };
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('accessToken');
    return res.status(200).send({ message: 'Déconnexion réussie' });
  }

  @Patch('register-step-two/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateStepTwo(
    @Param('id') id: string,
    @Body() stepTwoDto: RegistrationStepTwoDto,
    @Request() req: ExpressRequest,
  ) {
    const user = req.user as User;
    console.log(user, id);
    if (user._id !== id) {
      throw new ForbiddenException(
        'You are not allowed to update this information.',
      );
    }
    return await this.authService.updateStepTwo(id, stepTwoDto);
    return { message: "Mise à jour de l'étape deux effectuée avec succès" };
  }

  @Patch('register-step-three/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateStepThree(
    @Param('id') id: string,
    @Body() stepThreeDto: RegistrationStepThreeDto,
    @Request() req: ExpressRequest,
  ): Promise<User> {
    const user = req.user as User;
    if (user._id !== id && user.role !== 'admin') {
      throw new ForbiddenException(
        'You are not allowed to update this information.',
      );
    }

    try {
      const updatedUser = await this.authService.updateStepThree(
        id,
        stepThreeDto,
      );
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException(
        "Erreur lors de la mise à jour des informations de l'utilisateur",
      );
    }
  }

  @Patch('register-step-four/:id')
  async updateStepFour(
    @Param('id') id: string,
    @Body() stepFourDto: RegistrationStepFourDto,
  ): Promise<User> {
    const updatedUser = await this.authService.updateStepFour(id, stepFourDto);
    return updatedUser;
  }
}
