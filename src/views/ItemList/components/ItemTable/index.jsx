import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Chip from '@material-ui/core/Chip';
import { useHistory } from 'react-router-dom';
import moment from "moment";
import { Lightbox } from "react-modal-image";
import { AppContext } from '../../../../Hooks/AppContext'

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

const ItemTable = props => {
  const { className, items, loading, ...rest } = props;
  const history = useHistory();
  const classes = useStyles();

  const appContext = useContext(AppContext);
  const { ctxConfig } = appContext;
  const context = ctxConfig[0];
  const [selecteditems] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [modelOpen, setModalOpen] = useState(false);
  const [modelImage, setModelImage] = useState();

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
      pathname: '/edit-item',
      search: '?id=' + item.id,
      state: { item: item }
    })
  }

  const onPriceClick = (item) => {
    history.push({
      pathname: '/item/price',
      search: '?id=' + item.id,
      state: { itemId: item.id }
    })
  }

  const handleImageClick = (item) => {
    const modalImg = context ? context['S3'].value + item.image : item.image;
    setModelImage(modalImg);
    setModalOpen(true);
  }

  const handleModalClose = () => {
    setModalOpen(false);
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
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Length</TableCell>
                    <TableCell>Breadth</TableCell>
                    <TableCell>Height</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created On</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.slice(0, rowsPerPage).map(item => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={item.id}
                      selected={selecteditems.indexOf(item.id) !== -1}>
                      <TableCell>
                        {item.title}
                      </TableCell>
                      <TableCell>{item.category.title}</TableCell>
                      <TableCell>
                        <Button variant="outlined" color="primary" onClick={() => {handleImageClick(item)}}>
                          View Image
                        </Button>
                      </TableCell>
                      <TableCell>{item.length ? item.length : '--'}</TableCell>
                      <TableCell>
                        {item.breadth ? item.breadth : '--'}
                      </TableCell>
                      <TableCell>
                        {item.height ? item.height : '--'}
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
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => { onPriceClick(item) }}
                          className={classes.buttons}>
                          Price List
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
          count={items.length}
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

ItemTable.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default ItemTable;
