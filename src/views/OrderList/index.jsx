import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { OrderTable } from './components';
import { listOrders } from '../../Models/Order';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const OrderList = () => {
  const classes = useStyles();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async() => {
    setLoading(true);
    const res = await listOrders();
    if(res && res.data) {
      setOrders(res.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <OrderTable orders={orders} loading={loading} />
      </div>
    </div>
  );
};

export default OrderList;
