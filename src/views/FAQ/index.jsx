import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useLocation } from "react-router-dom";

import { FAQTable } from './components';
import { listFAQs } from '../../Models/FAQ'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const FAQList = () => {
  const classes = useStyles();
  const location = useLocation();
  const [faqs, setFAQList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFAQs = async () => {
    const res = await listFAQs()
    if(res && res.data) {
      setFAQList(res.data);
    }

    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchFAQs()
 }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <FAQTable faqs={faqs} loading={loading} />
      </div>
    </div>
  );
};

export default FAQList;
