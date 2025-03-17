import { StatsService } from './stats.service';
import { AuthenticatedRequest } from 'src/common';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getDailyStats(): Promise<import("./dto").LeaderBoardDto[]>;
    getWeeklyStats(): Promise<import("./dto").LeaderBoardDto[]>;
    getBiWeeklyStats(): Promise<import("./dto").LeaderBoardDto[]>;
    getMetrics(): Promise<import("./dto").GetMetricsDto>;
    getTotalActiveQuizzes(): Promise<import("./dto").LeaderBoardDto[]>;
    getMonthlyCompletion(): Promise<import("./dto").MonthlyQuizCompletionDto[]>;
    getWeeklyCompletion(): Promise<import("./dto").DailyQuizCompletionDto[]>;
    getPersonalStats(req: AuthenticatedRequest): Promise<import("./dto").PersonalStatsDto>;
}
