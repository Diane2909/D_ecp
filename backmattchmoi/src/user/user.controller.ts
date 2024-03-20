import { Get, Delete, Param, UseGuards, Patch, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UserService } from './user.service';


import { User } from './user.module';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';


@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Post('upload-profile-image/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: string,
  ): Promise<string> {
    try {
      if (!file) {
        throw new BadRequestException('Aucun fichier reçu dans la requête');
      }

      console.log("Appel du service Cloudinary pour l'upload de l'image");
      const imageUrl = await this.cloudinaryService.uploadImage(file);

      console.log('Image uploadée avec succès, URL:', imageUrl);

      await this.userService.updateUserProfileImage(userId, imageUrl);

      return imageUrl;
    } catch (error) {
      console.error("Erreur lors de l'upload de l'image de profil :", error);
      throw new BadRequestException(error.message);
    }
  }

  @Get(':_id')
  async findUserById(@Param('_id') userId: string): Promise<User> {
    return this.userService.findUserById(userId);
  }


  @Delete(':_id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  deleteUser(@Param('_id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Patch(':_id')
  @UseGuards(JwtAuthGuard)
  updateUser(@Param('_id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
