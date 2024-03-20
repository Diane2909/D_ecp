import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  UnauthorizedException,
  Delete,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { log } from 'console';
 
@Controller('matches')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Get('/all')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  getAllMatches() {
    return this.matchService.getAllMatches();
  }
 
  @Get(':userId')
  @UseGuards(AuthGuard('jwt'))
  async getMatchesForUser(@Param('userId') userId: string, @Request() req) {
    console.log('User ID from JWT:', req.user._id);
    console.log('User ID from URL:', userId);
 
    if (req.user._id === userId) {
      const matches = await this.matchService.findMatchesForUser(userId);
      console.log('Matches found:', matches);
      return matches;
    } else {
      console.error('Unauthorized access attempt:', userId);
      throw new UnauthorizedException(
        'You are not authorized to view these matches.',
      );
    }
  }

  @Delete(':userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  deleteMatches(@Param('userId') id: string) {
    return this.matchService.deleteMatches(id);
  }
}
