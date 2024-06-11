import { Context, PermissionLevel } from '@graasp/sdk';

import {
  ANSWER_CY,
  ANSWER_SUBMIT_BUTTON_CY,
  PLAYER_VIEW_CY,
  QUESTION_CY,
  REQUIRED_CHIP_CY,
  SAVED_CHIP_CY,
  SUBMITTED_CHIP_CY,
  buildDataCy,
} from '@/config/selectors';

import { USER_ANSWER_CONTENT } from '../../fixtures/appData';
import {
  ANSWER_SETTING,
  GENERAL_SETTING,
  QUESTION_SETTING,
} from '../../fixtures/appSettings';

describe('player view as anonymous', () => {
  beforeEach(() => {
    cy.setUpApi(
      {
        appSettings: [QUESTION_SETTING, ANSWER_SETTING, GENERAL_SETTING],
      },
      {
        context: Context.Player,
        memberId: undefined,
      },
    );
    cy.visit(`/`);
  });

  it('player view is visible', () => {
    cy.get(buildDataCy(PLAYER_VIEW_CY)).should('be.visible');
  });

  it('answer and question field is visible', () => {
    cy.get(buildDataCy(ANSWER_CY)).should('be.visible');
    // should be effectively empty
    cy.get(buildDataCy(ANSWER_CY)).invoke('val').should('eq', '');
    cy.get(buildDataCy(QUESTION_CY)).should('be.visible');
  });

  it('answer should be modifiable but not saveable', () => {
    cy.get(buildDataCy(ANSWER_CY)).should('be.visible');
    cy.get(buildDataCy(REQUIRED_CHIP_CY)).should('be.visible');
    cy.get(buildDataCy(ANSWER_SUBMIT_BUTTON_CY)).should('not.be.visible');
    cy.get(buildDataCy(ANSWER_CY)).type(USER_ANSWER_CONTENT);
    cy.get(buildDataCy(ANSWER_CY))
      .invoke('val')
      .should('eq', USER_ANSWER_CONTENT);
    cy.get(buildDataCy(ANSWER_SUBMIT_BUTTON_CY)).should('not.be.visible');
    cy.get(buildDataCy(SAVED_CHIP_CY)).should('not.exist');
  });
});

describe('player view as reader', () => {
  beforeEach(() => {
    cy.setUpApi(
      {
        appSettings: [QUESTION_SETTING, ANSWER_SETTING, GENERAL_SETTING],
      },
      {
        context: Context.Player,
        permission: PermissionLevel.Read,
      },
    );
    cy.visit(`/`);
  });

  it('player view is visible', () => {
    cy.get(buildDataCy(PLAYER_VIEW_CY)).should('be.visible');
  });

  it('answer and question field is visible', () => {
    cy.get(buildDataCy(ANSWER_CY)).should('be.visible');
    // should be effectively empty
    cy.get(buildDataCy(ANSWER_CY)).invoke('val').should('eq', '');
    cy.get(buildDataCy(QUESTION_CY)).should('be.visible');
  });

  it('answer should be modifiable and saveable', () => {
    cy.get(buildDataCy(ANSWER_CY)).should('be.visible');
    cy.get(buildDataCy(REQUIRED_CHIP_CY)).should('be.visible');
    cy.get(buildDataCy(ANSWER_CY)).type(USER_ANSWER_CONTENT);
    cy.get(buildDataCy(SAVED_CHIP_CY)).should('be.visible');
    cy.get(buildDataCy(SUBMITTED_CHIP_CY)).should('not.exist');
    cy.get(buildDataCy(ANSWER_SUBMIT_BUTTON_CY)).should('be.enabled');
    cy.get(buildDataCy(ANSWER_SUBMIT_BUTTON_CY)).click();
    cy.get(buildDataCy(ANSWER_CY))
      .invoke('val')
      .should('eq', USER_ANSWER_CONTENT);
    cy.get(buildDataCy(SUBMITTED_CHIP_CY)).should('be.visible');
  });
});

describe('player view without configuration', () => {
  beforeEach(() => {
    cy.setUpApi(
      {},
      {
        context: Context.Player,
        permission: PermissionLevel.Read,
      },
    );
    cy.visit(`/`);
  });

  it('player view is visible', () => {
    cy.get(buildDataCy(PLAYER_VIEW_CY)).should('be.visible');
  });

  it('answer and question field is visible', () => {
    cy.get(buildDataCy(ANSWER_CY)).should('be.visible');
    cy.get(buildDataCy(QUESTION_CY)).should('be.not.visible');
  });
});
