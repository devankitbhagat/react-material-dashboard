import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  Button,
  Card,
  CardActions,
  CardContent,
} from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import { getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  buttons: {
    marginLeft: theme.spacing(1)
  },
  skeleton: {
    padding: '20px'
  }
}));


const columns = [
  {
    name: "firstName",
    label: "First Name",
    options: {
      filter: false,
      sort: true,
    }
  },
  {
    name: "lastName",
    label: "Last Name",
    options: {
      filter: false,
      sort: true,
    }
  },
  {
    name: "emailId",
    label: "Email",
    options: {
      filter: false,
      sort: true,
    }
  },
  {
    name: "gender",
    label: "Gender",
    options: {
      filter: false,
      sort: true,
    }
  },
  {
    name: "age",
    label: "Age",
    options: {
      filter: false,
      sort: true,
    }
  },
  {
    name: "mobileNumber",
    label: "Mobile Number",
    options: {
      filter: false,
      sort: true,
    }
  },
  {
    name: "lastSignIn",
    label: "Last Sign In",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (date) => {
        return moment(date).format('YYYY-MM-DD');
      }
    }
  },
];

const UsersTable = props => {
  const { className, users, loading, ...rest } = props;

  const classes = useStyles();

  const [selectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const rowSkeleton = () => {
    let a = [1, 2, 3, 4, 5, 6];
    return (
      <div className={classes.skeleton}>
        {a.map(() => (
          <Skeleton height={40} />
        ))}
      </div>
    );
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            {loading && rowSkeleton()}
            {!loading && (
              <MUIDataTable
                title={"User List"}
                data={users}
                columns={columns}
                options={{selectableRows: 'none'}}
              />
            )}
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default UsersTable;
