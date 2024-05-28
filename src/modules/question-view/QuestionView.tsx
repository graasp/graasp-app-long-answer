import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ReplayIcon from '@mui/icons-material/Replay';
import SendIcon from '@mui/icons-material/Send';
import { FormControl, FormHelperText, OutlinedInput } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import { useLocalContext } from '@graasp/apps-query-client';
import {
  QuestionLabel,
  RequiredChip,
  SavedChip,
  SubmittedChip,
} from '@graasp/ui/apps';

import {
  ANSWER_CY,
  ANSWER_SUBMIT_BUTTON_CY,
  QUESTION_CY,
  REQUIRED_CHIP_CY,
  RESET_BTN_CY,
  SAVED_CHIP_CY,
  SUBMITTED_CHIP_CY,
} from '@/config/selectors';
import { UserAnswerStatus } from '@/interfaces/userAnswer';
import { useSettings } from '@/modules/context/SettingsContext';

import useUserAnswers from '../context/UserAnswersContext';

const QuestionView = (): JSX.Element => {
  const { t } = useTranslation('translations', { keyPrefix: 'QUESTION_VIEW' });
  const { memberId } = useLocalContext();
  const {
    question,
    // todo: define max rows and min rows in settings
    rows: { maxRows, minRows, numRows },
    chars: { maxChars, minChars },
    general,
  } = useSettings();
  const { required } = general;

  const {
    userAnswer,
    deleteAnswer,
    submitAnswer,
    setAnswer: setSavedAnswer,
  } = useUserAnswers();

  const [answer, setAnswer] = useState<string>('');

  const userAuthentified = useMemo(
    () => typeof memberId === 'string' && memberId.length > 0,
    [memberId],
  );

  // Update the answer if the stored value change
  useEffect(() => {
    setAnswer(userAnswer?.answer ?? '');
  }, [userAnswer]);
  const answerStatus = useMemo(() => userAnswer?.status, [userAnswer?.status]);

  const showSubmitButton = useMemo(
    () => userAnswer?.status === UserAnswerStatus.Saved,
    [userAnswer],
  );
  const showResetButton = useMemo(
    () => typeof userAnswer !== 'undefined',
    [userAnswer],
  );

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newAns = e.target.value;
    setAnswer(newAns);
    if (userAuthentified) {
      setSavedAnswer(newAns);
    }
  };

  const getSubmitButton = useCallback(
    (): JSX.Element => (
      <Button
        disabled={!userAnswer && userAuthentified}
        variant="contained"
        onClick={() => submitAnswer()}
        startIcon={<SendIcon />}
        data-cy={ANSWER_SUBMIT_BUTTON_CY}
      >
        {t('SUBMIT')}
      </Button>
    ),
    [submitAnswer, t, userAnswer, userAuthentified],
  );

  // todo: figure out how to handle min/max/num rows

  // todo: figure out how to handle min/max chars

  return (
    <Stack spacing={1} justifyContent="space-between" direction="row">
      <Box flex={1}>
        <QuestionLabel dataCy={QUESTION_CY}>
          <>
            {question?.content}
            {required && question?.content.length > 0 && <sup>*</sup>}
          </>
        </QuestionLabel>
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
            onChange={handleAnswerChange}
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
      </Box>
      <Stack width="10rem" direction="column" spacing={1} alignItems="center">
        {answerStatus === UserAnswerStatus.Submitted && (
          <SubmittedChip
            label={t('SUBMIT_OK_HELPER')}
            tooltip={t('SUBMIT_OK_TOOLTIP')}
            dataCy={SUBMITTED_CHIP_CY}
          />
        )}
        {answerStatus === UserAnswerStatus.Saved && (
          <SavedChip
            label={t('SAVED_HELPER')}
            tooltip={t('SAVED_TOOLTIP')}
            dataCy={SAVED_CHIP_CY}
          />
        )}
        {answer.length === 0 && required && (
          <RequiredChip
            label={t('REQUIRED_CHIP')}
            tooltip={t('REQUIRED_TOOLTIP')}
            dataCy={REQUIRED_CHIP_CY}
          />
        )}
        <Stack sx={{ mt: 1 }} direction="column" spacing={1}>
          <Collapse orientation="horizontal" in={showResetButton}>
            <Tooltip title={t('RESET_ANSWER')}>
              <Button
                disabled={!userAnswer}
                variant="outlined"
                onClick={() => deleteAnswer()}
                startIcon={<ReplayIcon />}
                data-cy={RESET_BTN_CY}
              >
                {t('RESET')}
              </Button>
            </Tooltip>
          </Collapse>
          <Collapse orientation="horizontal" in={showSubmitButton}>
            {getSubmitButton()}
          </Collapse>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default QuestionView;
