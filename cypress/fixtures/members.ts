import { CompleteMember, MemberType } from '@graasp/sdk';

export const MEMBERS: { [key: string]: CompleteMember } = {
  ANNA: {
    id: '0f0a2774-a965-4b97-afb4-bccc3796e060',
    name: 'anna',
    type: MemberType.Individual,
    email: 'anna@gmail.com',
    extra: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  BOB: {
    id: '1f0a2774-a965-4b97-afb4-bccc3796e060',
    name: 'bob',
    type: MemberType.Individual,
    email: 'bob@gmail.com',
    extra: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  CHARLIE: {
    id: '2f0a2774-a965-4b97-afb4-bccc3796e060',
    name: 'charlie',
    type: MemberType.Individual,
    email: 'charlie@gmail.com',
    extra: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

export const CURRENT_MEMBER = MEMBERS.ANNA;
