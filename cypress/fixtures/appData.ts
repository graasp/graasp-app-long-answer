import { AppData, AppDataVisibility } from '@graasp/sdk';

import { AppDataType } from '@/config/appData';

import { MEMBERS } from './members';
import { MOCK_SERVER_DISCRIMINATED_ITEM } from './mockItem';

export const USER_ANSWER_CONTENT = 'My answer.';
export const EDITED_USER_ANSWER_CONTENT = 'My new answer.';

export const USER_ANSWER_1 = 'Incorrect';
export const USER_ANSWER_2 = 'Correct';
export const USER_ANSWER_3 = 'Correct';
export const USER_ANSWER_4 = 'Incorrect';

export const ANSWER_1: AppData = {
  id: '0',
  creator: MEMBERS.ANNA,
  member: MEMBERS.ANNA,
  type: AppDataType.UserAnswer,
  data: {
    answer: USER_ANSWER_1,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  item: MOCK_SERVER_DISCRIMINATED_ITEM,
  visibility: AppDataVisibility.Member,
};

export const ANSWER_2: AppData = {
  id: '1',
  creator: MEMBERS.ANNA,
  member: MEMBERS.ANNA,
  type: AppDataType.UserAnswer,
  data: {
    answer: USER_ANSWER_2,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  item: MOCK_SERVER_DISCRIMINATED_ITEM,
  visibility: AppDataVisibility.Member,
};

export const ANSWER_3: AppData = {
  id: '2',
  creator: MEMBERS.BOB,
  member: MEMBERS.BOB,
  type: AppDataType.UserAnswer,
  data: {
    answer: USER_ANSWER_3,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  item: MOCK_SERVER_DISCRIMINATED_ITEM,
  visibility: AppDataVisibility.Member,
};

export const ANSWER_4: AppData = {
  id: '3',
  creator: MEMBERS.CHARLIE,
  member: MEMBERS.CHARLIE,
  type: AppDataType.UserAnswer,
  data: {
    answer: USER_ANSWER_4,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  item: MOCK_SERVER_DISCRIMINATED_ITEM,
  visibility: AppDataVisibility.Member,
};
