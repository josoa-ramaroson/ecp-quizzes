import { Injectable } from '@nestjs/common';
import { MembersService } from '../members';
import { QuizzesService } from '../quizzes/quizzes.service';
import { AnswerHistoryService } from '../answer-history';

import { getLastMondayFromWeek } from 'src/utils';
import {
  DailyQuizCompletionDto,
  GetMetricsDto,
  LeaderBoardDto,
  MonthlyQuizCompletionDto,
  PersonalStatsDto,
  TDayDto,
  TMonthlyNameDto,
} from './dto';
import { setToXDay } from 'src/utils/set-to-date-x-day';
import { Types } from 'mongoose';
import { EMemberRole } from 'src/common';

@Injectable()
export class StatsService {
  constructor(
    private readonly membersService: MembersService,
    private readonly quizzesService: QuizzesService,
    private readonly answerHistoryService: AnswerHistoryService,
  ) {}

  async getPersonalStats(memberId: string): Promise<PersonalStatsDto> {
    const quizzesTaken =
      await this.answerHistoryService.countQuizTakenByMember(memberId);
    const averageScore = await this.getAverageScoreOfMember(memberId);
    const questionAnswered = await this.getTotalQuestionsAnswered(memberId);
    const perfectScore = await this.getPerfectScoreCount(memberId);

    return {
      quizzesTaken,
      averageScore,
      questionAnswered,
      perfectScore,
    };
  }

  async getDailyMemberLeaderboard() {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const stats = await this.getLeaderboardFromDate(today, EMemberRole.MEMBER);
    return stats;
  }

  async getWeeklyMemberLeaderboard() {
    const lastLastMonday = getLastMondayFromWeek(0);
    const stats = await this.getLeaderboardFromDate(
      lastLastMonday,
      EMemberRole.MEMBER,
    );
    return stats;
  }

  async getBiWeeklyMemberLeaderboard() {
    const lastLastMonday = getLastMondayFromWeek(1);
    const stats = await this.getLeaderboardFromDate(
      lastLastMonday,
      EMemberRole.MEMBER,
    );
    return stats;
  }

  async getTopPerformerMember() {
    const statQuiz = new Date('2025-03-10');
    return (
      await this.getLeaderboardFromDate(statQuiz, EMemberRole.MEMBER)
    ).slice(0, 3);
  }

  async getLeaderboardFromDate(
    date: Date,
    role: EMemberRole,
  ): Promise<LeaderBoardDto[]> {
    const members = await this.membersService.findAllMember(role);

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
            pseudo: member.pseudo,
            score: totalScore,
          };
        } catch (error) {
          // Handle case where no quizzes were found
          console.error(error);
          return {
            memberId: member._id.toString(),
            pseudo: member.pseudo,
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

  async getWeeklyCompletion(): Promise<DailyQuizCompletionDto[]> {
    const days: TDayDto[] = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    const today = new Date();
    const completionsArray = await Promise.all(
      days.map(async (dayName, i) => {
        const day = setToXDay(today, i);
        // Use a single date for both start and end of day
        const startOfDay = new Date(day);
        const endOfDay = new Date(day);

        const completions =
          await this.answerHistoryService.countHistoryBetweenDate(
            startOfDay,
            endOfDay,
          );

        return {
          name: dayName,
          completions,
        };
      }),
    );

    return completionsArray;
  }

  async getMonthlyCompletion(): Promise<MonthlyQuizCompletionDto[]> {
    const completionsArray: MonthlyQuizCompletionDto[] = [];
    const weeks: TMonthlyNameDto[] = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    for (let i = 1; i < 5; i++) {
      const startMonday = getLastMondayFromWeek(i);
      const deadlineMonday = getLastMondayFromWeek(i - 1);
      const completions =
        await this.answerHistoryService.countHistoryBetweenDate(
          startMonday,
          deadlineMonday,
        );
      completionsArray.push({
        name: weeks[i - 1],
        completions,
      });
    }
    return completionsArray;
  }

  async getAverageScoreOfMember(
    memberId: string | Types.ObjectId,
  ): Promise<number> {
    try {
      const answerHistory = await this.answerHistoryService.findByMember(
        memberId.toString(),
      );

      // If no quizzes taken, return 0
      if (answerHistory.length === 0) {
        return 0;
      }

      const scorePercentages = await Promise.all(
        answerHistory.map(async (history) => {
          try {
            const maxPossibleScore =
              await this.quizzesService.getQuizzesMaxScore(
                history.quizId.toString(),
              );
            // Avoid division by zero
            return maxPossibleScore > 0 ? history.score / maxPossibleScore : 0;
          } catch (error) {
            console.error(
              `Error calculating score for quiz ${history.quizId.toString()}: ${error.message}`,
            );
            return 0; // Return 0 for this quiz on error
          }
        }),
      );

      // Calculate average and round to 2 decimal places
      const averageScore =
        scorePercentages.length > 0
          ? scorePercentages.reduce((sum, percentage) => sum + percentage, 0) /
            scorePercentages.length
          : 0;

      return Math.round(averageScore * 10000) / 100;
    } catch (error) {
      console.error(
        `Error calculating average score for member ${memberId.toString()}: ${error.message}`,
      );
      return 0; // Return 0 on error
    }
  }

  async getPerfectScoreCount(
    memberId: string | Types.ObjectId,
  ): Promise<number> {
    try {
      const answerHistory = await this.answerHistoryService.findByMember(
        memberId.toString(),
      );

      // If no quizzes taken, return 0
      if (answerHistory.length === 0) {
        return 0;
      }

      // Count quizzes where actual score equals max possible score
      const perfectScores = await Promise.all(
        answerHistory.map(async (history) => {
          try {
            const maxPossibleScore =
              await this.quizzesService.getQuizzesMaxScore(
                history.quizId.toString(),
              );
            // A perfect score is when the member's score equals the max possible score
            return history.score === maxPossibleScore ? 1 : 0;
          } catch (error) {
            console.error(
              `Error checking perfect score for quiz ${history.quizId.toString()}: ${error.message}`,
            );
            return 0; // Don't count on error
          }
        }),
      );

      // Sum up the count of perfect scores
      return perfectScores.reduce((sum, isPerfect) => sum + isPerfect, 0);
    } catch (error) {
      console.error(
        `Error calculating perfect scores for member ${memberId.toString()}: ${error.message}`,
      );
      return 0; // Return 0 on error
    }
  }

  async getTotalQuestionsAnswered(
    memberId: string | Types.ObjectId,
  ): Promise<number> {
    try {
      const answerHistory = await this.answerHistoryService.findByMember(
        memberId.toString(),
      );

      // If no quizzes taken, return 0
      if (answerHistory.length === 0) {
        return 0;
      }

      // Count the number of questions in each quiz and sum them up
      const questionsAnswered = answerHistory.map((history) => {
        try {
          // Get the number of questions in this quiz from the answers record
          return history.answersRecord?.length || 0;
        } catch (error) {
          console.error(
            `Error counting questions for quiz ${history.quizId.toString()}: ${error.message}`,
          );
          return 0; // Don't count on error
        }
      });

      // Sum up the total number of questions
      return questionsAnswered.reduce((sum, count) => sum + count, 0);
    } catch (error) {
      console.error(
        `Error calculating total questions for member ${memberId.toString()}: ${error.message}`,
      );
      return 0; // Return 0 on error
    }
  }
}
