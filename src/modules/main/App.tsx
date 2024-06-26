import { useEffect } from 'react';

import { useLocalContext } from '@graasp/apps-query-client';
import { Context } from '@graasp/sdk';

import { DEFAULT_LANG } from '@/config/constants';

import i18n from '../../config/i18n';
import { SettingsProvider } from '../context/SettingsContext';
import { UserAnswersProvider } from '../context/UserAnswersContext';
import BuilderView from './BuilderView';
import PlayerView from './PlayerView';

const App = (): JSX.Element => {
  const context = useLocalContext();

  useEffect(() => {
    // handle a change of language
    const lang = context?.lang ?? DEFAULT_LANG;
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [context]);

  const renderContent = (): JSX.Element => {
    switch (context.context) {
      case Context.Builder:
        return <BuilderView />;

      case Context.Player:
      default:
        return <PlayerView />;
    }
  };

  return (
    <SettingsProvider>
      <UserAnswersProvider>{renderContent()}</UserAnswersProvider>
    </SettingsProvider>
  );
};

export default App;
