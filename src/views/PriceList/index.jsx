import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useLocation } from "react-router-dom";

import { PriceTable } from './components';
import {listPrice} from '../../Models/Price'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const PriceList = () => {
  const classes = useStyles();
  const location = useLocation();
  const [prices, setPriceList] = useState([]);
  const [itemId, setItemId] = useState();
  const [loading, setLoading] = useState(false);

  const fetchPrice = async (itemId) => {
    const res = await listPrice(itemId)
    if(res && res.data) {
      setPriceList(res.data);
    }

    setLoading(false);
  }

  useEffect(() => {
    if(location.state.itemId) {
      setItemId(location.state.itemId);
      setLoading(true);
      fetchPrice(location.state.itemId)
    }
 }, [location]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <PriceTable prices={prices} loading={loading} itemId={itemId} />
      </div>
    </div>
  );
};

export default PriceList;
