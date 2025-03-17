import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { StatsService } from './stats.service';
import { AuthenticatedRequest, EErrorMessage } from 'src/common';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}
  @Get('daily-leaderboard')
  async getDailyStats() {
    return this.statsService.getDailyMemberLeaderboard();
  }

  @Get('weekly-leaderboard')
  async getWeeklyStats() {
    return this.statsService.getWeeklyMemberLeaderboard();
  }

  @Get('bi-weekly-leaderboard')
  async getBiWeeklyStats() {
    return this.statsService.getBiWeeklyMemberLeaderboard();
  }

  @Get('metrics')
  async getMetrics() {
    return this.statsService.getMetrics();
  }

  @Get('top-performer')
  async getTotalActiveQuizzes() {
    return this.statsService.getTopPerformerMember();
  }

  @Get('monthly-completion')
  async getMonthlyCompletion() {
    return this.statsService.getMonthlyCompletion();
  }

  @Get('weekly-completion')
  async getWeeklyCompletion() {
    return this.statsService.getWeeklyCompletion();
  }

  @Get('personal')
  async getPersonalStats(@Req() req: AuthenticatedRequest) {
    const memberId = req.user?.sub;
    if (!memberId)
      throw new UnauthorizedException(EErrorMessage.INVALID_TOKEN_ERROR);
    return this.statsService.getPersonalStats(memberId);
  }
}
