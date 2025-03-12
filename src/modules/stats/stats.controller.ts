import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}
  @Get('daily-leaderboard')
  async getDailyStats() {
    return this.statsService.getDailyLeaderboard();
  }

  @Get('weekly-leaderboard')
  async getWeeklyStats() {
    return this.statsService.getWeeklyLeaderboard();
  }

  @Get('bi-weekly-leaderboard')
  async getBiWeeklyStats() {
    return this.statsService.getBiWeeklyLeaderboard();
  }

  @Get('metrics')
  async getMetrics() {
    return this.statsService.getMetrics();
  }

  @Get('top-performer')
  async getTotalActiveQuizzes() {
    return this.statsService.getTopPerformer();
  }

  // @Get("total-active-quizzes")
  // async getCompletionRate() {
  //     return this.statsService.getTotalActiveQuizzes();
  // }
}
