import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match, MatchDocument } from './match.schema';
import { User, UserDocument } from 'src/auth/user.model';
 
@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
 
  async createMatch(user1Id: string, user2Id: string): Promise<string> {
    const newMatch = new this.matchModel({
      user1: user1Id,
      user2: user2Id,
    });
    const savedMatch = await newMatch.save();
    return savedMatch.id;
  }
  async findMatchesForUser(userId: string): Promise<Match[]> {
    return this.matchModel
      .find({
        $or: [{ user1: userId }, { user2: userId }],
      })
      .populate('user1 user2', 'username')
      .exec();
  }

  async deleteMatches(id: string): Promise<Match[] | null> {
    await this.matchModel.findByIdAndDelete(id).exec();
    const updatedMatches = await this.matchModel.find().exec();
    return updatedMatches;
  }

  async getAllMatches(): Promise<Match[]> {
    try {
      const matches = await this.matchModel.find().exec();
      return matches;
    } catch (error) {
      throw new Error('Error fetching all matches');
    }
  }

}