export enum EErrorMessage {
  CORRECT_ANSWERS_NOT_IN_ANSWERS_OPTIONS = 'correctAnswers must be included in the answersOptions.',
  QUESTIONS_NOT_FOUND = 'The requested questions are not found in the database.',
  QUESTION_NOT_FOUND = 'The requested question is not found in the database.',
  UPDATED_QUESTION_NOT_FOUND = 'The updated questions is not in the database.',

  MEMBER_NOT_FOUND = 'The requested member is not found in the database.',
  UPDATED_MEMBER_NOT_FOUND = 'The updated member is not in the database.',
  MEMBER_ALREADY_EXISTS = 'The member already exists in the database.',

  AUTH_FAILED_ERROR = 'Invalid first name or password.',
  UNAUTHORIZED_ERROR = 'Unauthorized access.',
  INVALID_TOKEN_ERROR = 'Invalid token.',

  QUIZ_NOT_FOUND = 'The requested quiz is not found in the database',
  QUIZZES_NOT_FOUND = 'The requested quizzes are not found in the database',
  UPDATED_QUIZ_NOT_FOUND = 'The updated quiz is not in the database.',
  QUIZZ_ALREADY_EXISTS = 'The quiz already exists in the database.',

  QUESTION_ALREADY_IN_THE_QUIZ = 'The question is already in the quiz.',
  QUESTIONS_ALREADY_IN_THE_QUIZ = 'The questions are already in the quiz.',
  QUESTION_NOT_IN_THE_QUIZ = 'The question is not in the quiz.',

  MISSING_QUESTION_ID_ERROR = 'Missing questionId.',
  MISSING_QUESTION_IDS_ERROR = 'Missing questionIds.',
  QUESTION_IDS_IN_BAD_FORMAT = 'QuestionIds must be in an array format.',
  INVALID_QUESTION_ID_ERROR = 'Invalid questionId.',
  INVALID_QUESTION_IDS_ERROR = 'Invalid questionIds',

  INVALID_RESSOURCE_REFERENCE = 'Please verify the ressources references in the url.',

  INTERNAL_SERVER_ERROR = 'We got a problems from the server. Please try again later.',
}
