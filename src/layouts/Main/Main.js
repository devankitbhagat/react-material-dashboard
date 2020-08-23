import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { Sidebar, Topbar, Footer } from './components';
import { useAppConfig } from '../../Hooks/AppConfig'
import { getAppConfig } from '../../Models/Util'
import { AppContext } from '../../Hooks/AppContext';
import { keyBy } from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  }
}));

const Main = props => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const appContext = useContext(AppContext);
  const { ctxConfig, updateContextConfig } = appContext;
  const [appConfig, setAppConfig] = useAppConfig();
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  const setConfig = async () => {
    const res = await getAppConfig();
    if(res && res.data && res.data.length > 0 ) {
      const config = keyBy(res.data, 'key');
      setAppConfig(config);
      updateContextConfig(config);
    }
  }
  useEffect(() => {
    if(!appConfig) {
      setConfig()
    }
  }, [appConfig])

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}>
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <main className={classes.content}>
        {children}
        <Footer />
      </main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
