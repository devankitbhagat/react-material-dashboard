import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { ItemToolbar, ItemTable } from './components';
import { listItems } from '../../Models/Item'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ItemList = () => {
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const getItemList = async () => {
    setLoading(true);
    const res = await listItems();
    if(res && res.data) {
      setItems(res.data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    getItemList();
  }, [])

  return (
    <div className={classes.root}>
      <ItemToolbar />
      <div className={classes.content}>
        <ItemTable items={items} loading={loading} />
      </div>
    </div>
  );
};

export default ItemList;
