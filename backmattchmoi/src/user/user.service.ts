import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/user.model';

import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUserById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async deleteUser(id: string): Promise<User[] | null> {
    await this.userModel.findByIdAndDelete(id).exec();
    const updatedUsers = await this.userModel.find().exec();
    return updatedUsers;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    Object.assign(user, updateUserDto);

    return await user.save();
  }

  async updateUserProfileImage(
    userId: string,
    imageUrl: string,
  ): Promise<User | null> {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }
      user.profileImageUrl = imageUrl;
      await user.save();
      return user;
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de l'URL de l'image de profil :",
        error,
      );
      return null;
    }
  }
}
