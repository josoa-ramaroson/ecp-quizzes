export enum EErrorMessage {
    CORRECT_ANSWERS_NOT_IN_ANSWERS_OPTIONS = "correctAnswers must be included in the answersOptions",
    QUESTIONS_NOT_FOUND = "The requested questions are not found in the database",
    QUESTION_NOT_FOUND = "The requested question is not found in the database",
    UPDATED_QUESTION_NOT_FOUND = "The updated questions is not in the database",

    MEMBER_NOT_FOUND = "The requested member is not found in the database",
    UPDATED_MEMBER_NOT_FOUND = "The updated member is not in the database",
    MEMBER_ALREADY_EXISTS = "The member already exists in the database",
}