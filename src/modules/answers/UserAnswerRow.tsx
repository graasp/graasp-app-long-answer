import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Tooltip } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { UserAnswerAppData } from '@/config/appData';
import {
  makeUserAnswerAnswerCellCy,
  makeUserAnswerCorrectCellCy,
  makeUserAnswerMemberCellCy,
  makeUserAnswerRowCy,
} from '@/config/selectors';
import { useSettings } from '@/modules/context/SettingsContext';

const UserAnswerRow: FC<{
  key: number;
  userAnswerAppData: UserAnswerAppData;
}> = ({ key, userAnswerAppData }) => {
  const { t } = useTranslation('translations', { keyPrefix: 'ANSWERS' });
  const { answer = '—' } = userAnswerAppData.data;
  const { answer: correctAnswer } = useSettings();

  const hasAnswer = !correctAnswer?.content;
  const isCorrect =
    answer === correctAnswer?.content ? (
      <Tooltip title={t('TABLE.TOOLTIP.CORRECT')}>
        <CheckIcon color="success" />
      </Tooltip>
    ) : (
      <Tooltip title={t('TABLE.TOOLTIP.INCORRECT')}>
        <ClearIcon color="error" />
      </Tooltip>
    );

  const rowId = userAnswerAppData.creator?.id || key;

  return (
    <TableRow data-cy={makeUserAnswerRowCy(rowId)}>
      <TableCell data-cy={makeUserAnswerMemberCellCy(rowId)}>
        {userAnswerAppData.creator?.name}
      </TableCell>
      <TableCell data-cy={makeUserAnswerAnswerCellCy(rowId)}>
        {answer}
      </TableCell>
      <TableCell data-cy={makeUserAnswerCorrectCellCy(rowId)}>
        {hasAnswer ? (
          <Tooltip title={t('TABLE.TOOLTIP.UNDEFINED')}>
            <QuestionMarkIcon color="warning" />
          </Tooltip>
        ) : (
          isCorrect
        )}
      </TableCell>
    </TableRow>
  );
};

export default UserAnswerRow;
