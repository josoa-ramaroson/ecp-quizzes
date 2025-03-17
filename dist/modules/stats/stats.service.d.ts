import { MembersService } from '../members';
import { QuizzesService } from '../quizzes/quizzes.service';
import { AnswerHistoryService } from '../answer-history';
import { DailyQuizCompletionDto, GetMetricsDto, LeaderBoardDto, MonthlyQuizCompletionDto, PersonalStatsDto } from './dto';
import { Types } from 'mongoose';
import { EMemberRole } from 'src/common';
export declare class StatsService {
    private readonly membersService;
    private readonly quizzesService;
    private readonly answerHistoryService;
    constructor(membersService: MembersService, quizzesService: QuizzesService, answerHistoryService: AnswerHistoryService);
    getPersonalStats(memberId: string): Promise<PersonalStatsDto>;
    getDailyMemberLeaderboard(): Promise<LeaderBoardDto[]>;
    getWeeklyMemberLeaderboard(): Promise<LeaderBoardDto[]>;
    getBiWeeklyMemberLeaderboard(): Promise<LeaderBoardDto[]>;
    getTopPerformerMember(): Promise<LeaderBoardDto[]>;
    getLeaderboardFromDate(date: Date, role: EMemberRole): Promise<LeaderBoardDto[]>;
    getMetrics(): Promise<GetMetricsDto>;
    getQuizCompletionRate(quizId: string): Promise<number>;
    getGlobalCompletionRate(): Promise<number>;
    getWeeklyCompletion(): Promise<DailyQuizCompletionDto[]>;
    getMonthlyCompletion(): Promise<MonthlyQuizCompletionDto[]>;
    getAverageScoreOfMember(memberId: string | Types.ObjectId): Promise<number>;
    getPerfectScoreCount(memberId: string | Types.ObjectId): Promise<number>;
    getTotalQuestionsAnswered(memberId: string | Types.ObjectId): Promise<number>;
}
