export const PLAYER_VIEW_CY = 'player-view';
export const BUILDER_VIEW_CY = 'builder-view';
export const ADMIN_VIEW_CY = 'admin-view';
export const ANALYTICS_VIEW_CY = 'analytics-view';
export const SETTINGS_VIEW_PANE_CY = 'settings-view-pane';
export const SETTINGS_VIEW_CY = 'settings-view';
export const TABLE_VIEW_PANE_CY = 'table-view-pane';
export const TAB_SETTINGS_VIEW_CY = 'tab-settings-view';
export const TAB_TABLE_VIEW_CY = 'tab-table-view';
export const SETTINGS_QUESTION_TEXT_FIELD_CY = 'settings-question-text-field';
export const SETTINGS_ANSWER_TEXT_FIELD_CY = 'settings-answer-text-field';
export const SETTINGS_SAVE_BTN_CY = 'settings-save-button';
export const makeUserAnswerRowCy = (index: number | string): string =>
  `user-answer-row-${index}`;
export const makeUserAnswerMemberCellCy = (index: number | string): string =>
  `user-answer-member-cell-${index}`;
export const makeUserAnswerAnswerCellCy = (index: number | string): string =>
  `user-answer-answer-cell-${index}`;
export const makeUserAnswerCorrectCellCy = (index: number | string): string =>
  `user-answer-correct-cell-${index}`;

export const QUESTION_CY = 'question';
export const ANSWER_CY = 'answer';
export const ANSWER_SUBMIT_BUTTON_CY = 'answer-submit-button';

export const buildDataCy = (selector: string): string =>
  `[data-cy=${selector}]`;

// selects elements that have the specified attribute with a value beginning exactly with a given string
export const buildDataStartPatternCy = (selector: string): string =>
  `[data-cy^=${selector}]`;
