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
import Modal from '@material-ui/core/Modal';
import OrderDetail from '../OrderDetail';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

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
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
		flex: 1,
		color: 'white'
  },
}));


const columns = [
	{
		name: "id",
		label: "Order Id",
		options: {
			filter: false,
			sort: true,
		}
	},
	{
		name: "user",
		label: "Customer",
		options: {
			filter: false,
			sort: true,
			customBodyRender: (user) => {
				return user ? user.firstName : '';
			}
		}
	},
	{
		name: "user",
		label: "Mobile Number",
		options: {
			filter: false,
			sort: true,
			customBodyRender: (user) => {
				return user ? user.mobileNumber : '';
			}
		}
	},
	{
		name: "item",
		label: "Item",
		options: {
			filter: false,
			sort: true,
			customBodyRender: (item) => {
				return item ? item[0].title : ''
			}
		}
	},
	{
		name: "orderProduct",
		label: "Duration Type",
		options: {
			filter: false,
			sort: true,
			customBodyRender: (product) => {
				return product ? product[0].durationType : ''
			}
		}
	},
	{
		name: "orderProduct",
		label: "Duration",
		options: {
			filter: false,
			sort: true,
			customBodyRender: (product) => {
				return product ? product[0].duration : ''
			}
		}
	},
	{
		name: "paymentType",
		label: "Payment",
		options: {
			filter: true,
			sort: true,
		}
	},
	{
		name: "createdAt",
		label: "Order Date",
		options: {
			filter: false,
			sort: true,
			customBodyRender: (date) => {
				return moment(date).format('YYYY-MM-DD HH:mm:ss')
			}
		}
	},
	{
		name: "createdAt",
		label: "Return Date",
		options: {
			filter: false,
			sort: true,
			customBodyRender: (date, rowData) => {
				const durationData = rowData.rowData[4];
				return durationData ? moment(date).add(durationData[0].duration, durationData[0].durationType).format('YYYY-MM-DD') : '';
			}
		}
	},
	{
		name: "status",
		label: "Order Status",
		options: {
			filter: true,
			sort: true,
		}
	},
];

const OrderTable = props => {
	const { className, orders, loading, ...rest } = props;
	const [openModal, setOpenModal] = useState(false);
	const [orderId, setOrderId] = useState();

	const classes = useStyles();

	const handleRowClick = (rowData, rowMeta) => {
		setOrderId(rowData[0])
		setOpenModal(true);
	}

	const handleClose = () => {
		setOpenModal(false);
		setOrderId(null);
	}

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
		<>
			<Card {...rest} className={clsx(classes.root, className)}>
				<CardContent className={classes.content}>
					<PerfectScrollbar>
						<div className={classes.inner}>
							{loading && rowSkeleton()}
							{!loading && (
								<MUIDataTable
									title={"Order List"}
									data={orders}
									columns={columns}
									options={{ selectableRows: 'none', filterType: 'checkbox', onRowClick: handleRowClick }}
								/>
							)}
						</div>
					</PerfectScrollbar>
				</CardContent>
			</Card>
			<Dialog fullScreen open={openModal} >
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							ORDER DETAILS
            </Typography>
					</Toolbar>
				</AppBar>
				<OrderDetail orderId={orderId}/>
			</Dialog>
		</>
	);
};

OrderTable.propTypes = {
	className: PropTypes.string,
	orders: PropTypes.array,
	loading: PropTypes.bool
};

export default OrderTable;
