import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/registration-step-one.dto';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegistrationStepTwoDto } from './dto/registration-step-two.dto';
import { RegistrationStepThreeDto } from './dto/registration-step-three.dto';
import { RegistrationStepFourDto } from './dto/registration-step-four.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  async validateUserById(userId: string): Promise<User | null> {
    const user = await this.userModel.findById(userId).exec();
    return user || null;
  }
  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ user: User; accessToken: string }> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      role: 'user',
    });
    const createdUser = await newUser.save();
    if (!createdUser._id || !createdUser.role) {
      throw new Error(
        'Enregistrement utilisateur échoué. Informations utilisateur manquantes.',
      );
    }
    const accessToken = await this.createAccessToken(
      createdUser._id.toString(),
      createdUser.role,
    );
    return { user: createdUser, accessToken };
  }
  async login(
    username: string,
    password: string,
  ): Promise<{ user: User; accessToken: string }> {
    const user = await this.userModel.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new NotFoundException(
        "Nom d'utilisateur ou mot de passe incorrect",
      );
    }
    const accessToken = this.jwtService.sign({
      sub: user.id,
      role: user.role,
    });
    return { user, accessToken };
  }
  async createAccessToken(userId: string, role: string): Promise<string> {
    return this.jwtService.sign({
      sub: userId,
      role: role,
    });
  }
  async logout(): Promise<void> {}
  async updateStepTwo(
    id: string,
    stepTwoDto: RegistrationStepTwoDto,
  ): Promise<User> {
    const userToUpdate = await this.userModel.findById(id);
    if (!userToUpdate) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    userToUpdate.name = stepTwoDto.name;
    userToUpdate.description = stepTwoDto.description;
    userToUpdate.age = stepTwoDto.age;
    userToUpdate.gender = stepTwoDto.gender;
    await userToUpdate.save();
    return userToUpdate;
  }
  async updateStepThree(
    id: string,
    stepThreeDto: RegistrationStepThreeDto,
  ): Promise<User> {
    const userToUpdate = await this.userModel.findById(id);
    if (!userToUpdate) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const interestsString = stepThreeDto.interests.join(', ');
    userToUpdate.interests = interestsString;
    await userToUpdate.save();
    return userToUpdate;
  }
  async updateStepFour(
    id: string,
    stepFourDto: RegistrationStepFourDto,
  ): Promise<User> {
    const userToUpdate = await this.userModel.findById(id);
    if (!userToUpdate) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    userToUpdate.hereTo = stepFourDto.hereTo;
    userToUpdate.wantToMeet = stepFourDto.wantToMeet;
    userToUpdate.ageRange = stepFourDto.ageRange;
    userToUpdate.location = stepFourDto.location;
    await userToUpdate.save();
    return userToUpdate;
  }
  async validateUserByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<User | null> {
    const user = await this.userModel
      .findOne({
        $or: [{ email: email }, { username: username }],
      })
      .exec();
    return user || null;
  }
}
