import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { BannerToolBar, BannerTable } from './components';
import { listBanner } from '../../Models/Banner'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const BannerList = () => {
  const classes = useStyles();

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBannerList = async () => {
    setLoading(true);
    const res = await listBanner();
    if(res && res.data) {
      setBanners(res.data);
    } else {
      setBanners([]);
    }

    setLoading(false);
  }

  useEffect(() => {
    getBannerList();
  }, [])

  return (
    <div className={classes.root}>
      <BannerToolBar />
      <div className={classes.content}>
        <BannerTable banners={banners} loading={loading} />
      </div>
    </div>
  );
};

export default BannerList;
