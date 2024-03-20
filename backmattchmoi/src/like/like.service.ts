import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like, LikeDocument } from './like.schema';
import { MatchService } from '../match/match.service';
import { User, UserDocument } from 'src/auth/user.model';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private matchService: MatchService,
  ) {}

  async likeUser(
    fromUserId: string,
    toUserId: string,
  ): Promise<{ like: Like; matchId: string | null }> {
    const existingLike = await this.likeModel
      .findOne({
        fromUser: fromUserId,
        toUser: toUserId,
      })
      .exec();
    if (existingLike) {
      throw new Error('Like already exists');
    }

    const newLike = new this.likeModel({
      fromUser: fromUserId,
      toUser: toUserId,
    });
    await newLike.save();

    const mutualLike = await this.likeModel
      .findOne({
        fromUser: toUserId,
        toUser: fromUserId,
      })
      .exec();

    if (mutualLike) {
      const matchId = await this.matchService.createMatch(fromUserId, toUserId);
      await this.likeModel.deleteMany({
        $or: [
          { fromUser: toUserId, toUser: fromUserId },
          { fromUser: fromUserId, toUser: toUserId },
        ],
      });
      return { like: newLike, matchId };
    } else {
      return { like: newLike, matchId: null };
    }
  }
}
