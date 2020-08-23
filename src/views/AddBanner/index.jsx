import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import BannerForm from './components/BannerForm';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const AddBanner = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
      >
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <BannerForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default AddBanner;
