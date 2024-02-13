import { ChangeEvent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Grid, TextField, Typography } from '@mui/material';

import { useLocalContext } from '@graasp/apps-query-client';
import { AppData, PermissionLevel } from '@graasp/sdk';

import isEqual from 'lodash.isequal';
import sortBy from 'lodash.sortby';

import { AppDataType } from '@/config/appData';
import { hooks, mutations } from '@/config/queryClient';
import { ANSWER_CY, PLAYER_VIEW_CY, QUESTION_CY } from '@/config/selectors';
import { UserAnswer } from '@/interfaces/userAnswer';
import SubmitButton from '@/modules/common/SubmitButton';
import { useSettings } from '@/modules/context/SettingsContext';

function isAnswer(appData: AppData): boolean {
  return appData.type === AppDataType.UserAnswer;
}

const PlayerView = (): JSX.Element => {
  const { t } = useTranslation('translations', { keyPrefix: 'PLAYER' });
  const { permission } = useLocalContext();
  const {
    question,
    // answer: answerSavedState,
  } = useSettings();
  const { data: appData } = hooks.useAppData();
  const { mutate: postAppData } = mutations.usePostAppData();

  // use effect to get required app data
  let savedAnswer = '';

  if (appData) {
    // only show the last answer
    const savedAnswerObject = sortBy(appData, ['createdAt'])
      .reverse()
      .find(isAnswer) as AppData<UserAnswer>;
    if (savedAnswerObject) {
      savedAnswer = savedAnswerObject.data.answer ?? '';
    }
  }

  const [answer, setAnswer] = useState<string>(savedAnswer);

  const disableSave = useMemo(() => {
    // disable if permission is read
    if (permission === PermissionLevel.Read) {
      return true;
    }
    // disable if answer is equal
    return isEqual(savedAnswer, answer);
  }, [answer, savedAnswer, permission]);

  const disabledMessage = useMemo(() => {
    if (permission === PermissionLevel.Read) {
      return t('SAVE_BUTTON');
    }
    return t('SAVED_MESSAGE');
  }, [permission, t]);

  const handleChangeAnswer = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setAnswer(value);
  };

  const handleSubmitAnswer = (): void => {
    postAppData({
      data: { answer },
      type: AppDataType.UserAnswer,
      visibility: 'member',
    });
  };

  return (
    <div data-cy={PLAYER_VIEW_CY}>
      <Box p={2}>
        <Typography data-cy={QUESTION_CY} variant="h5" gutterBottom>
          {question?.content}
        </Typography>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-around"
        >
          <Grid item xs={9} sm={10}>
            <TextField
              inputProps={{
                'data-cy': ANSWER_CY,
              }}
              fullWidth
              value={answer}
              onChange={handleChangeAnswer}
            />
          </Grid>
          <Grid item xs={3} sm={2}>
            <SubmitButton disabled={disableSave} handler={handleSubmitAnswer}>
              {disableSave ? disabledMessage : t('SAVE_BUTTON')}
            </SubmitButton>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default PlayerView;
