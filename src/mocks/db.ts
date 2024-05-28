import type { Database, LocalContext } from '@graasp/apps-query-client';
import {
  AppItemFactory,
  CompleteMember,
  Context,
  MemberFactory,
  PermissionLevel,
} from '@graasp/sdk';

import { API_HOST } from '@/config/env';

export const mockMembers: CompleteMember[] = [
  MemberFactory({
    id: '1',
    name: 'current-member',
    email: 'a@graasp.org',
    type: 'individual',
    createdAt: new Date('1996-09-08T19:00:00').toISOString(),
    updatedAt: new Date().toISOString(),
  }),
  MemberFactory({
    id: 'mock-member-id-2',
    name: 'mock-member-2',
    email: 'b@graasp.org',
    type: 'individual',
    createdAt: new Date('1995-02-02T15:00:00').toISOString(),
    updatedAt: new Date().toISOString(),
  }),
];

export const mockItem = AppItemFactory({
  id: '02052cf4-cc45-45c6-b0b8-61102244ed11',
  name: 'app-long-answer',
  creator: mockMembers[0],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const defaultMockContext: LocalContext = {
  apiHost: API_HOST,
  permission: PermissionLevel.Admin,
  context: Context.Builder,
  itemId: mockItem.id,
  memberId: mockMembers[0].id,
};

const buildDatabase = (members?: CompleteMember[]): Database => ({
  appData: [],
  appActions: [],
  members: members ?? mockMembers,
  appSettings: [],
  items: [mockItem],
});

export default buildDatabase;
