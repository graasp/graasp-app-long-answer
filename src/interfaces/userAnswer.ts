export enum UserAnswerStatus {
  Saved = 'saved',
  Submitted = 'submitted',
}

export type UserAnswer = {
  answer?: string;
  status?: UserAnswerStatus;
};
