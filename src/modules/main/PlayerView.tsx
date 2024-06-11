import { PLAYER_VIEW_CY } from '@/config/selectors';

import QuestionView from '../question-view/QuestionView';

const PlayerView = (): JSX.Element => (
  <div data-cy={PLAYER_VIEW_CY}>
    <QuestionView />
  </div>
);

export default PlayerView;
