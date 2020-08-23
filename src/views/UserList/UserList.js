import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import { listUsers } from '../../Models/User';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async() => {
    const res = await listUsers();
    if(res && res.data) {
      setUsers(res.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchUsers();
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <UsersTable users={users} loading={loading} />
      </div>
    </div>
  );
};

export default UserList;
