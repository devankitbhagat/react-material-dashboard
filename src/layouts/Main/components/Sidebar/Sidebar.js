import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ViewListIcon from '@material-ui/icons/ViewList';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';

import { SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Orders',
      href: '/orders',
      icon: <ShoppingBasketIcon />
    },
    {
      title: 'Users',
      href: '/users',
      icon: <PeopleIcon />
    },
    {
      title: 'Items',
      href: '/items',
      icon: <ViewListIcon />
    },
    {
      title: 'FAQs',
      href: '/faqs',
      icon: <QuestionAnswerIcon />
    },
    {
      title: 'Banners',
      href: '/banners',
      icon: <ViewCarouselIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
