import { Context, PermissionLevel } from '@graasp/sdk';

import {
  ADMIN_VIEW_CY,
  SETTINGS_ANSWER_TEXT_FIELD_CY,
  SETTINGS_QUESTION_TEXT_FIELD_CY,
  SETTINGS_SAVE_BTN_CY,
  SETTINGS_VIEW_CY,
  SETTINGS_VIEW_PANE_CY,
  TABLE_VIEW_PANE_CY,
  TAB_SETTINGS_VIEW_CY,
  TAB_TABLE_VIEW_CY,
  buildDataCy,
  buildDataStartPatternCy,
  makeUserAnswerAnswerCellCy,
  makeUserAnswerMemberCellCy,
  makeUserAnswerRowCy,
} from '@/config/selectors';

import {
  ANSWER_1,
  ANSWER_2,
  ANSWER_3,
  ANSWER_4,
  USER_ANSWER_2,
} from '../../fixtures/appData';
import {
  ANSWER_SETTING,
  EDITED_ANSWER_CONTENT,
  EDITED_QUESTION_CONTENT,
  ORIGINAL_ANSWER_CONTENT,
  ORIGINAL_QUESTION_CONTENT,
  QUESTION_SETTING,
} from '../../fixtures/appSettings';
import { MEMBERS } from '../../fixtures/members';

describe('builder as admin by default', () => {
  beforeEach(() => {
    cy.setUpApi(
      {},
      {
        context: Context.Builder,
        permission: PermissionLevel.Admin,
      },
    );
    cy.visit(`/`);
  });

  it('should show the answers', () => {
    cy.get(buildDataCy(TAB_TABLE_VIEW_CY)).should('be.visible');
    cy.get(buildDataCy(TAB_TABLE_VIEW_CY)).should(
      'have.attr',
      'aria-selected',
      'true',
    );
    cy.get(buildDataCy(TABLE_VIEW_PANE_CY)).should('be.visible');
    cy.get(buildDataCy(SETTINGS_VIEW_PANE_CY)).should('be.hidden');
  });

  it('should be possible to navigate to the settings', () => {
    cy.get(buildDataCy(TAB_SETTINGS_VIEW_CY)).should('be.visible');
    cy.get(buildDataCy(TAB_SETTINGS_VIEW_CY)).should('be.enabled');
    cy.get(buildDataCy(TAB_SETTINGS_VIEW_CY)).click();
    cy.get(buildDataCy(SETTINGS_VIEW_PANE_CY)).should('be.visible');
    cy.get(buildDataCy(TABLE_VIEW_PANE_CY)).should('be.hidden');
  });
});

describe('builder settings as admin without configuration', () => {
  beforeEach(() => {
    cy.setUpApi(
      {},
      {
        context: Context.Builder,
        permission: PermissionLevel.Admin,
      },
    );
    cy.visit(`/`);
    cy.get(buildDataCy(TAB_SETTINGS_VIEW_CY)).click();
  });

  it('checks the UI', () => {
    cy.get(buildDataCy(ADMIN_VIEW_CY)).should('exist');
    cy.get(buildDataCy(SETTINGS_VIEW_CY)).should('be.visible');

    cy.get(buildDataCy(SETTINGS_QUESTION_TEXT_FIELD_CY)).should('be.empty');
    cy.get(buildDataCy(SETTINGS_ANSWER_TEXT_FIELD_CY)).should('be.empty');
  });

  it('sets the question', () => {
    const question = ORIGINAL_QUESTION_CONTENT;
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).should('be.disabled');
    cy.get(buildDataCy(SETTINGS_QUESTION_TEXT_FIELD_CY)).type(question);
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).should('be.enabled');
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).click();
    cy.get(buildDataCy(SETTINGS_QUESTION_TEXT_FIELD_CY))
      .invoke('val')
      .should('eq', question);
  });

  it('sets the answer', () => {
    const answer = ORIGINAL_ANSWER_CONTENT;
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).should('be.disabled');
    cy.get(buildDataCy(SETTINGS_QUESTION_TEXT_FIELD_CY)).type(answer);
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).should('be.enabled');
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).click();
    cy.get(buildDataCy(SETTINGS_QUESTION_TEXT_FIELD_CY))
      .invoke('val')
      .should('eq', answer);
  });
});

describe('builder settings as admin with question and answer.', () => {
  beforeEach(() => {
    cy.setUpApi(
      {
        appSettings: [QUESTION_SETTING, ANSWER_SETTING],
      },
      {
        context: Context.Builder,
        permission: PermissionLevel.Admin,
      },
    );
    cy.visit(`/`);
    cy.get(buildDataCy(TAB_SETTINGS_VIEW_CY)).click();
  });

  it('checks the question', () => {
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).should('be.disabled');
    cy.get(buildDataCy(SETTINGS_QUESTION_TEXT_FIELD_CY))
      .invoke('val')
      .should('eq', QUESTION_SETTING.data.content);
  });

  it('checks the answer', () => {
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).should('be.disabled');
    cy.get(buildDataCy(SETTINGS_ANSWER_TEXT_FIELD_CY))
      .invoke('val')
      .should('eq', ANSWER_SETTING.data.content);
  });

  it('edits the question', () => {
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).should('be.disabled');
    cy.get(buildDataCy(SETTINGS_QUESTION_TEXT_FIELD_CY)).clear();
    cy.get(buildDataCy(SETTINGS_QUESTION_TEXT_FIELD_CY)).type(
      EDITED_QUESTION_CONTENT,
    );
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).should('be.enabled');
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).click();
    cy.get(buildDataCy(SETTINGS_QUESTION_TEXT_FIELD_CY))
      .invoke('val')
      .should('eq', EDITED_QUESTION_CONTENT);
  });

  it('edits the answer', () => {
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).should('be.disabled');
    cy.get(buildDataCy(SETTINGS_ANSWER_TEXT_FIELD_CY)).clear();
    cy.get(buildDataCy(SETTINGS_ANSWER_TEXT_FIELD_CY)).type(
      EDITED_ANSWER_CONTENT,
    );
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).should('be.enabled');
    cy.get(buildDataCy(SETTINGS_SAVE_BTN_CY)).click();
    cy.get(buildDataCy(SETTINGS_ANSWER_TEXT_FIELD_CY))
      .invoke('val')
      .should('eq', EDITED_ANSWER_CONTENT);
  });
});

describe('builder answers as admin with question and answer.', () => {
  beforeEach(() => {
    cy.setUpApi(
      {
        appSettings: [QUESTION_SETTING, ANSWER_SETTING],
        appData: [ANSWER_1, ANSWER_2, ANSWER_3, ANSWER_4],
      },
      {
        context: Context.Builder,
        permission: PermissionLevel.Admin,
      },
    );
    cy.visit(`/`);
  });

  it('has the right number of answers (one per member)', () => {
    cy.get(buildDataStartPatternCy(makeUserAnswerRowCy(''))).should(
      'have.length',
      Object.keys(MEMBERS).length,
    );
  });

  it('shows user name', () => {
    cy.get(buildDataCy(makeUserAnswerMemberCellCy(MEMBERS.ANNA.id)))
      .invoke('text')
      .should('eq', MEMBERS.ANNA.name);
  });

  it('only considers the last answer', () => {
    cy.get(buildDataCy(makeUserAnswerAnswerCellCy(MEMBERS.ANNA.id)))
      .invoke('text')
      .should('eq', USER_ANSWER_2);
  });

  // todo: correct indicators
});

// todo: warning when no answer is specified
