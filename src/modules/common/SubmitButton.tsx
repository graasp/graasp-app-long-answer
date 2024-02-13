import { MouseEventHandler, ReactElement } from 'react';

import { Button } from '@mui/material';

import { ANSWER_SUBMIT_BUTTON_CY } from '@/config/selectors';

type PropTypes = {
  disabled: boolean;
  children: ReactElement | string;
  handler: MouseEventHandler<HTMLButtonElement>;
};

const SubmitButton = ({
  disabled,
  children,
  handler,
}: PropTypes): ReactElement => (
  <Button
    variant="contained"
    size="large"
    fullWidth
    onClick={handler}
    data-cy={ANSWER_SUBMIT_BUTTON_CY}
    disabled={disabled}
  >
    {children}
  </Button>
);

export default SubmitButton;
