import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import isEqual from 'lodash.isequal';

import { version } from '@/../package.json';
import {
  AnswerSettings,
  GeneralSettings,
  QuestionSettingsType,
} from '@/config/appSettings';
import { SETTINGS_SAVE_BTN_CY, SETTINGS_VIEW_CY } from '@/config/selectors';

import { useSettings } from '../context/SettingsContext';
import AnswerSettingsComponent from './AnswersSettings';
import GeneralSettingsEdit from './GeneralSettings';
import QuestionSettingsComponent from './QuestionSettings';

const SettingsView: FC = () => {
  const { t } = useTranslation();
  const {
    question: questionSavedState,
    answer: answerSavedState,
    general: generalSavedState,
    saveSettings,
  } = useSettings();

  const [question, setQuestion] =
    useState<QuestionSettingsType>(questionSavedState);
  const [answer, setAnswer] = useState<AnswerSettings>(answerSavedState);
  const [general, setGeneral] = useState<GeneralSettings>(generalSavedState);

  const saveAllSettings = (): void => {
    saveSettings('question', question);
    saveSettings('answer', answer);
    saveSettings('general', general);
  };

  useEffect(() => setQuestion(questionSavedState), [questionSavedState]);
  useEffect(() => {
    setAnswer(answerSavedState);
  }, [answerSavedState]);

  const disableSave = useMemo(() => {
    if (
      isEqual(questionSavedState, question) &&
      isEqual(answerSavedState, answer) &&
      isEqual(generalSavedState, general)
    ) {
      return true;
    }
    return false;
  }, [
    answer,
    answerSavedState,
    general,
    generalSavedState,
    question,
    questionSavedState,
  ]);

  return (
    <Stack data-cy={SETTINGS_VIEW_CY} spacing={2}>
      <Typography variant="h3">{t('SETTINGS.TITLE')}</Typography>
      <Typography variant="caption">{t('VERSION', { version })}</Typography>
      <GeneralSettingsEdit general={general} onChange={setGeneral} />
      <QuestionSettingsComponent
        question={question}
        onChange={(newSetting: QuestionSettingsType) => {
          setQuestion(newSetting);
        }}
      />
      <AnswerSettingsComponent
        answer={answer}
        onChange={(newSetting: AnswerSettings) => {
          setAnswer({ ...newSetting });
        }}
      />
      <Box>
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          onClick={saveAllSettings}
          disabled={disableSave}
          data-cy={SETTINGS_SAVE_BTN_CY}
        >
          {t('SETTINGS.SAVE_BTN')}
        </Button>
      </Box>
    </Stack>
  );
};

export default SettingsView;
