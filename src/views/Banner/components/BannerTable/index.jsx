import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Chip from '@material-ui/core/Chip';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../../../Hooks/AppContext'
import moment from "moment";
import { Lightbox } from "react-modal-image";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';

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
    alignbanners: 'center'
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

const BannerTable = props => {
  const { className, banners, loading, ...rest } = props;
  const appContext = useContext(AppContext);
  const { ctxConfig, updateContextConfig } = appContext;
  const context = ctxConfig[0];
  const history = useHistory();
  const classes = useStyles();

  const [selectedbanners] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [modelOpen, setModalOpen] = useState(false);
  const [modelImage, setModelImage] = useState();

  const handleModalClose = () => {
    setModalOpen(false);
  }

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

  const onEditClick = (item) => {
    history.push({
      pathname: '/edit-banner',
      search: '?id=' + item.id,
      state: { banner: item }
    })
  }

  const handleImageClick = (item) => {
    const modalImg = context ? context['S3'].value + item.fileName : item.fileName;
    setModelImage(modalImg);
    setModalOpen(true);
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            {modelOpen && <Lightbox open={modelOpen} medium={modelImage} large={modelImage} onClose={handleModalClose} />}
            {loading && rowSkeleton()}
            {!loading && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created On</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {banners.slice(0, rowsPerPage).map(item => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={item.id}
                      selected={selectedbanners.indexOf(item.id) !== -1}>
                      <TableCell>
                        {item.id}
                      </TableCell>
                      <TableCell>
                        <Button variant="outlined" color="primary" onClick={() => {handleImageClick(item)}}>
                          View Image
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Chip size="medium" style={item.status === 'active' ? { backgroundColor: 'green', color: 'white' } : { backgroundColor: 'red', color: 'white' }} label={item.status.toUpperCase()} />
                      </TableCell>
                      <TableCell>
                        {moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                      </TableCell>
                      <TableCell>
                        <Button variant="outlined" color="primary" onClick={() => { onEditClick(item) }}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={banners.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

BannerTable.propTypes = {
  className: PropTypes.string,
  banners: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default BannerTable;
