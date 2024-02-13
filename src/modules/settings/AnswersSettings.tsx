import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { AnswerSettings as AnswerSettingsType } from '@/config/appSettings';
import { SETTINGS_ANSWER_TEXT_FIELD_CY } from '@/config/selectors';

type PropTypes = {
  answer: AnswerSettingsType;
  onChange: (newSetting: AnswerSettingsType) => void;
};

const AnswerSettings: FC<PropTypes> = ({ answer, onChange }) => {
  const { t } = useTranslation();
  const { content: answerContent } = answer;
  return (
    <Stack spacing={1}>
      <Typography variant="h4">{t('SETTINGS.ANSWER.TITLE')}</Typography>
      <TextField
        inputProps={{
          'data-cy': SETTINGS_ANSWER_TEXT_FIELD_CY,
        }}
        value={answerContent}
        onChange={(e) => onChange({ content: e.target.value })}
      />
    </Stack>
  );
};

export default AnswerSettings;
