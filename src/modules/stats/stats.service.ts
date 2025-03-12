import { Injectable } from '@nestjs/common';
import { MembersService } from '../members';
import { QuizzesService } from '../quizzes/quizzes.service';
import { AnswerHistoryService } from '../answer-history';

import { getLastMondayFromWeek } from 'src/utils';
import { GetMetricsDto, LeaderBoardDto } from './dto';

@Injectable()
export class StatsService {
  constructor(
    private readonly membersService: MembersService,
    private readonly quizzesService: QuizzesService,
    private readonly answerHistoryService: AnswerHistoryService,
  ) {}

  async getDailyLeaderboard() {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const stats = await this.getLeaderboardFromDate(today);
    return stats;
  }

  async getWeeklyLeaderboard() {
    const lastLastMonday = getLastMondayFromWeek(0);
    const stats = await this.getLeaderboardFromDate(lastLastMonday);
    return stats;
  }

  async getBiWeeklyLeaderboard() {
    const lastLastMonday = getLastMondayFromWeek(1);
    const stats = await this.getLeaderboardFromDate(lastLastMonday);
    return stats;
  }

  async getTopPerformer() {
    const statQuiz = new Date('2025-03-10');
    return (await this.getLeaderboardFromDate(statQuiz)).slice(0, 3);
  }

  async getLeaderboardFromDate(date: Date): Promise<LeaderBoardDto[]> {
    const members = await this.membersService.findAll();

    // Use Promise.all to handle the async operations in parallel
    const membersWithScore = await Promise.all(
      members.map(async (member) => {
        try {
          const quizzesDoneFromADate =
            await this.answerHistoryService.findQuizTakenByMemberFromADate(
              member._id.toString(),
              date,
            );

          const totalScore = quizzesDoneFromADate.reduce(
            (acc, quiz) => acc + quiz.score,
            0,
          );

          // Return the member with their calculated score
          return {
            memberId: member._id.toString(),
            firstName: member.firstName,
            score: totalScore,
          };
        } catch (error) {
          // Handle case where no quizzes were found
          console.error(error);
          return {
            memberId: member._id.toString(),
            firstName: member.firstName,
            score: 0,
          };
        }
      }),
    );

    // Sort members by daily score
    const sortedMember = membersWithScore.sort((a, b) => b.score - a.score);
    const memberWithRank = sortedMember.map((member, index) => ({
      ...member,
      rank: index + 1,
    }));
    return memberWithRank;
  }

  async getMetrics(): Promise<GetMetricsDto> {
    const activeQuizzes = await this.quizzesService.getActiveQuizzesCount();
    const totalMember = await this.membersService.getTotalCount();
    const completionRate = await this.getGlobalCompletionRate();

    return {
      totalMember,
      activeQuizzes,
      completionRate,
    };
  }

  async getQuizCompletionRate(quizId: string) {
    const totalMember = await this.membersService.getTotalCount();
    const numberInHistory =
      await this.answerHistoryService.getNumberQuizInHistory(quizId);
    return (numberInHistory / totalMember) * 100;
  }

  async getGlobalCompletionRate() {
    const quizzes = await this.quizzesService.findAll();

    const completionRates = await Promise.all(
      quizzes.map(
        async (quiz) => await this.getQuizCompletionRate(quiz._id.toString()),
      ),
    );

    // Calculate the average only after all promises have resolved
    const completionRate =
      quizzes.length > 0
        ? Math.round(
            (completionRates.reduce((sum, rate) => sum + rate, 0) /
              quizzes.length) *
              10000,
          ) / 10000
        : 0;
    return completionRate;
  }
}
