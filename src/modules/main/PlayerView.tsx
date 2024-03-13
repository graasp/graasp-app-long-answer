import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  OutlinedInput,
  Typography,
} from '@mui/material';

import { useLocalContext } from '@graasp/apps-query-client';
import { AppData } from '@graasp/sdk';

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
  const { memberId } = useLocalContext();
  const {
    question,
    // answer: answerSavedState,
    rows: { maxRows, minRows, numRows },
    chars: { maxChars, minChars },
  } = useSettings();
  const { data: appData } = hooks.useAppData();
  const { mutate: postAppData } = mutations.usePostAppData();

  const [answer, setAnswer] = useState<string>('');
  const [savedAnswer, setSavedAnswer] = useState<string>('');

  // use effect to get required app data
  useEffect(() => {
    if (appData) {
      // only show the last answer
      const savedAnswerObject = sortBy(appData, ['createdAt'])
        .reverse()
        .find(isAnswer) as AppData<UserAnswer>;
      if (savedAnswerObject) {
        const savedAnswerText = savedAnswerObject.data.answer ?? '';
        setAnswer(savedAnswerText);
        setSavedAnswer(savedAnswerText);
      }
    }
  }, [appData]);

  const disableSave = useMemo(() => {
    // disable if there is no user (logged out or anonymous)
    if (!memberId) {
      return true;
    }
    // disable if answer is equal
    return isEqual(savedAnswer, answer);
  }, [answer, savedAnswer, memberId]);

  const disabledMessage = useMemo(() => {
    // disable if there is no user (logged out or anonymous)
    if (!memberId) {
      return t('SAVE_BUTTON');
    }
    return t('SAVED_MESSAGE');
  }, [memberId, t]);

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

  // todo: figure out how to handle min/max/num rows

  // todo: figure out how to handle min/max chars

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
          <Grid item xs={12}>
            <FormControl fullWidth>
              <OutlinedInput
                id="input-component"
                inputProps={{
                  'data-cy': ANSWER_CY,
                  maxlength: maxChars || undefined,
                  minlength: minChars || undefined,
                }}
                multiline
                minRows={minRows}
                maxRows={maxRows}
                rows={numRows}
                value={answer}
                onChange={handleChangeAnswer}
              />
              <FormHelperText
                id="input-component-helper-text"
                error={answer.length === maxChars}
              >
                {maxChars
                  ? `${answer.length} / ${maxChars} ${t('CHARACTERS')}`
                  : ''}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
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
