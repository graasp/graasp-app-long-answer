import { AppSetting } from '@graasp/sdk';

import { MOCK_SERVER_DISCRIMINATED_ITEM } from './mockItem';

export const ORIGINAL_QUESTION_CONTENT = 'Is the question field working?';
export const EDITED_QUESTION_CONTENT = 'Is editing the question field working?';

export const ORIGINAL_ANSWER_CONTENT = 'Correct';
export const EDITED_ANSWER_CONTENT = 'Edited Correct';

export const QUESTION_SETTING: AppSetting = {
  id: '0',
  name: 'question',
  data: {
    content: ORIGINAL_QUESTION_CONTENT,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  item: MOCK_SERVER_DISCRIMINATED_ITEM,
};

export const ANSWER_SETTING = {
  id: '1',
  name: 'answer',
  data: {
    content: ORIGINAL_ANSWER_CONTENT,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  item: MOCK_SERVER_DISCRIMINATED_ITEM,
};

export const GENERAL_SETTING = {
  id: '2',
  name: 'general',
  data: {
    required: true,
    autosubmit: false,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  item: MOCK_SERVER_DISCRIMINATED_ITEM,
};
