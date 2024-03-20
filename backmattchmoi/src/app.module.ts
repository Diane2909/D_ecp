import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth/auth.controller';
import { AboutModule } from './about/about.module';
import { AboutController } from './about/about.controller';
import { UserModule } from './user/user.module';
import { LikeModule } from './like/like.module';
//import { ChatService } from './chat/chat.service';
import { MatchModule } from './match/match.module';
import { User, UserSchema } from './auth/user.model';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AboutModule,
    LikeModule,
    MatchModule,
    AuthModule,
    HttpModule,
    UserModule,
    LikeModule,
    MatchModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      connectTimeoutMS: 3000,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController, UserController, AuthController, AboutController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
    UserService,
    AppService,
    CloudinaryService,
  ],
})
export class AppModule {
  constructor() {}
}
