import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from './jwt-payload.interface';
// import { User } from '../../user/user.schema';
import { ConfigService } from '@nestjs/config';

export interface AuthenticatedUser {
  _id: string;
  role: string;
  username: string;
  password: string;
  email: string;
  profileImageUrl: string;
  name: string;
  description: string;
  age: number;
  gender: string;
  interests: string;
  hereTo: string;
  wantToMeet: string;
  ageRange: string;
  location: string;  
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    const user = await this.authService.validateUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      _id: user._id.toString(),
      username: user.username,
      role: user.role,
      password: user.password,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      name: user.name,
      description: user.description,
      age: user.age,
      gender: user.gender,
      interests: user.interests,
      hereTo: user.hereTo,
      wantToMeet: user.wantToMeet,
      ageRange: user.ageRange,
      location: user.location,
    };
  }
}
