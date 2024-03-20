import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Match, MatchSchema } from './match.schema';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { HttpModule } from '@nestjs/axios';
import { User, UserSchema } from 'src/auth/user.model';
@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Match.name, schema: MatchSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [MatchController],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchModule {}
