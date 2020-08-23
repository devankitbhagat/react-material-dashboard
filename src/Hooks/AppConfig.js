import { useState, useEffect } from 'react';

const useAppConfig = () => {
  const [appConfig, setAppConfig] = useState(() => {
    let value;
    try {
      value = JSON.parse(window.sessionStorage.getItem('app-config'));
    } catch (e) {
      value = null;
    }
    return value;
  });

  useEffect(() => {
    window.sessionStorage.setItem('app-config', JSON.stringify(appConfig));
  }, [appConfig]);

  return [appConfig, setAppConfig];
};

export { useAppConfig };
