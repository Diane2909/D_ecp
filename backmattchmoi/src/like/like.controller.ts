import { Controller, Post, Body } from '@nestjs/common';
import { LikeService } from './like.service';
import { Like } from './like.schema';

@Controller('likes')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post()
  async likeUser(
    @Body('fromUserId') fromUserId: string,
    @Body('toUserId') toUserId: string,
  ): Promise<{ like: Like; matchId: string | null }> {
    return this.likeService.likeUser(fromUserId, toUserId);
  }
}
