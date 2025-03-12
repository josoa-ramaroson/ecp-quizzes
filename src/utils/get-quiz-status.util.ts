import { EQuizSTatus, IQuiz } from 'src/common';

export function getQuizStatus(quiz: IQuiz): EQuizSTatus {
  const nowDate = new Date();
  nowDate.setUTCHours(0, 0, 0, 0);
  const startDate = quiz.startDate;
  const deadline = quiz.deadline;
  // if (nowDate.getDay())

  if (nowDate > deadline) return EQuizSTatus.CLOSED;
  else if (startDate > nowDate) return EQuizSTatus.UPCOMING;
  else return EQuizSTatus.OPEN;
}
