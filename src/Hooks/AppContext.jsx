import React, { useState } from 'react';
import { useAppConfig } from './AppConfig';

export const AppContext = React.createContext(undefined);

export const AppContextProvider = (props) => {
  const appConfigDetail = useAppConfig();
  const [appConfig, setAppConfig] = useState(appConfigDetail);

  const updateAppConfig = (appConfig) => {
    setAppConfig(appConfig);
  };

  return (
    <AppContext.Provider
      value={{ ctxConfig: appConfig, updateContextConfig: updateAppConfig }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
