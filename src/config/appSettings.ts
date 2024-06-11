export type QuestionSettingsType = {
  content: string;
};

export type AnswerSettings = {
  content: string;
};

export type RowsSettings = {
  numRows: number;
  maxRows: number;
  minRows: number;
};

export type CharsSettings = {
  minChars: number;
  maxChars: number;
};

export type GeneralSettings = {
  required: boolean;
  autosubmit: boolean;
};
