import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { QuestionSettingsType } from '@/config/appSettings';
import { SETTINGS_QUESTION_TEXT_FIELD_CY } from '@/config/selectors';

type PropTypes = {
  question: QuestionSettingsType;
  onChange: (newSetting: QuestionSettingsType) => void;
};

const QuestionSettings: FC<PropTypes> = ({ question, onChange }) => {
  const { t } = useTranslation();
  const { content: questionContent } = question;
  return (
    <Stack spacing={1}>
      <Typography variant="h4">{t('SETTINGS.QUESTION.TITLE')}</Typography>
      <TextField
        inputProps={{
          'data-cy': SETTINGS_QUESTION_TEXT_FIELD_CY,
        }}
        value={questionContent}
        onChange={(e) => onChange({ content: e.target.value })}
      />
    </Stack>
  );
};

export default QuestionSettings;
