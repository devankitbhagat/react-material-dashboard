import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
	Typography
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import { getOrderDetail } from '../../../../Models/Order';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import {updateOrder} from '../../../../Models/Order';


const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: '#f5f5f5'
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	container: {
		backgroundColor: 'f5f5f5'
	}
}));


const OrderDetail = props => {
	const [openCustomerDetail, setOpenCustomerDetail] = React.useState(false);
	const [openAddressDetail, setOpenAddressDetail] = React.useState(false);
	const [openOrderDetail, setOpenOrderDetail] = React.useState(false);
	const [openPriceDetail, setOpenPriceDetail] = React.useState(false);
	const [orderId, setOrderId] = useState(props.orderId);
	const [orderDetail, setOrderDetail] = useState();
	const [loading, setLoading] = useState(false);
	const classes = useStyles();

	const fetchOrderDetail = async() => {
		setLoading(true);
		const res = await getOrderDetail(orderId);
		if(res && res.data) {
			setOrderDetail(res.data);
		}
		setLoading(false);
	}

	const updateOrderData = async (data) => {
		await updateOrder(orderId, data);
		await fetchOrderDetail();
	}

	useEffect(() => {
		setOrderDetail(null);
		setOrderId(props.orderId);
		if(props.orderId) {
			fetchOrderDetail(props.orderId)
		}
	}, [props.orderId])

	const onChange = (event) => {
		const data = {
			[event.target.name]: event.target.checked
		}
		updateOrderData(data)
  };

	const onValueChange = (event) => {
		const data = {
			[event.target.name]: event.target.value
		}
		updateOrderData(data)
  };

	return (
		<div className={classes.root}>
			<Typography variant="h3" component="h3" style={{padding: '20px'}}>
				Manage Order
			</Typography>
			{orderDetail && !loading && <>
			<Grid
			  container
			  direction="row"
			  justify="flex-start"
				style={{paddingTop: '20px'}}
			  alignItems="center"
			>
				<b style={{padding: '20px'}}>Manage Dates: </b>
				<TextField
					id="date"
					style={{padding: '20px'}}
					label="Pick Up Date"
					name="pickupDate"
					type="datetime-local"
					onChange={onValueChange}
					defaultValue={orderDetail.pickupDate ? moment(orderDetail.pickupDate).format('YYYY-MM-DDTHH:mm') : ''}
					className={classes.textField}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					id="date"
					style={{padding: '20px'}}
					name="deliveryDate"
					label="Delivery Date"
					type="datetime-local"
					onChange={onValueChange}
					defaultValue={orderDetail.deliveryDate ? moment(orderDetail.deliveryDate).format('YYYY-MM-DDTHH:mm') : ''}
					className={classes.textField}
					InputLabelProps={{
						shrink: true,
					}}
				/>

			</Grid>
			<Grid
			  container
			  direction="row"
			  justify="flex-start"
			  alignItems="center"
				style={{paddingTop: '20px'}}
			>
				<b style={{padding: '20px'}}>Manage Status: </b>
				<FormControlLabel style={{padding: '20px'}} control={<Switch checked={orderDetail.pickedUp} name="pickedUp" onChange={onChange} />} label="Item Picked Up" />
				<FormControlLabel style={{padding: '20px'}} control={<Switch checked={orderDetail.returned} name="returned" onChange={onChange} />} label="Item Returned" />
				<FormControlLabel style={{padding: '20px'}} control={<Switch checked={orderDetail.paymentReceived} name="paymentReceived" onChange={onChange} />} label="Payment Received" />
			</Grid>

			<Grid
			  container
			  direction="row"
			  justify="flex-start"
			  alignItems="center"
				style={{paddingTop: '20px'}}
			>
			<b style={{padding: '20px'}}>Manage Order Status: </b>
        <Select
          native
          value={orderDetail.status}
          onChange={onValueChange}
					style={{minWidth: '150px'}}
          inputProps={{
            name: 'status',
            id: 'filled-age-native-simple',
          }}
        >
          <option value="placed">Placed</option>
          <option value="accepted">Accepted</option>
					<option value="returned">Returned</option>
	        <option value="returnIntiated">Return Initiated</option>
        </Select>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12}>
					<PerfectScrollbar>
							<TableContainer component={Paper}>
								<Table className={classes.table} size="small" aria-label="a dense table">
								<TableBody>
									<TableRow>
										<TableCell>
											<IconButton aria-label="expand row" size="small" onClick={() => setOpenCustomerDetail(!openCustomerDetail)}>
												{openCustomerDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
											</IconButton>
										</TableCell>
										<TableCell align="left" ><b>Customer Details</b></TableCell>
									</TableRow>
									<TableRow>
										<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
											<Collapse in={openCustomerDetail} timeout="auto" unmountOnExit>
												<Box margin={1}>
													<Table size="small" aria-label="purchases">
														<TableBody>
															<TableRow key={"firstName"}>
																<TableCell align="left">Name</TableCell>
																<TableCell align="right">{orderDetail.user.firstName + " "+ orderDetail.user.lastName}</TableCell>
															</TableRow>
															<TableRow key={"mobileNumber"}>
																<TableCell align="left">Mobile Number</TableCell>
																<TableCell align="right">{orderDetail.user.mobileNumber}</TableCell>
															</TableRow>
															<TableRow key={"emailId"}>
																<TableCell align="left">Email Id</TableCell>
																<TableCell align="right">{orderDetail.user.emailId}</TableCell>
															</TableRow>
														</TableBody>
													</Table>
												</Box>
											</Collapse>
										</TableCell>
									</TableRow>

									<TableRow>
										<TableCell>
											<IconButton aria-label="expand row" size="small" onClick={() => setOpenAddressDetail(!openAddressDetail)}>
												{openAddressDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
											</IconButton>
										</TableCell>
										<TableCell align="left" ><b>Address Details</b></TableCell>
									</TableRow>
									<TableRow>
										<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
											<Collapse in={openAddressDetail} timeout="auto" unmountOnExit>
												<Box margin={1}>
													<Table size="small" aria-label="purchases">
														<TableBody>
																<TableRow key="id">
																	<TableCell align="left">Mobile Number</TableCell>
																	<TableCell align="right">{orderDetail.address.mobileNumber}</TableCell>
																</TableRow>
																<TableRow key="state">
																	<TableCell align="left">State</TableCell>
																	<TableCell align="right">{orderDetail.address.state}</TableCell>
																</TableRow>
																<TableRow key="pin">
																	<TableCell align="left">Pin Code</TableCell>
																	<TableCell align="right">{orderDetail.address.pincode}</TableCell>
																</TableRow>
																<TableRow key="Address">
																	<TableCell align="left">Address</TableCell>
																	<TableCell align="right">{orderDetail.address.address}</TableCell>
																</TableRow>
																<TableRow key="Landmark">
																	<TableCell align="left">Landmark</TableCell>
																	<TableCell align="right">{orderDetail.address.landmark}</TableCell>
																</TableRow>
																<TableRow key="City">
																	<TableCell align="left">City</TableCell>
																	<TableCell align="right">{orderDetail.address.city}</TableCell>
																</TableRow>
														</TableBody>
													</Table>
												</Box>
											</Collapse>
										</TableCell>
									</TableRow>

									<TableRow>
										<TableCell>
											<IconButton aria-label="expand row" size="small" onClick={() => setOpenOrderDetail(!openOrderDetail)}>
												{openOrderDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
											</IconButton>
										</TableCell>
										<TableCell align="left" ><b>Order Details</b></TableCell>
									</TableRow>
									<TableRow>
										<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
											<Collapse in={openOrderDetail} timeout="auto" unmountOnExit>
												<Box margin={1}>
													<Table size="small" aria-label="purchases">
														<TableBody>
															<TableRow key="id">
																<TableCell align="left">Order Id</TableCell>
																<TableCell align="right">{orderDetail.id}</TableCell>
															</TableRow>
															<TableRow key="itemName">
																<TableCell align="left">ItemName</TableCell>
																<TableCell align="right">{orderDetail.item[0].title}</TableCell>
															</TableRow>
															<TableRow key="count">
																<TableCell align="left">Quantity</TableCell>
																<TableCell align="right">{orderDetail.orderProduct[0].count}</TableCell>
															</TableRow>
															<TableRow key="Order Date">
																<TableCell align="left">Order Date</TableCell>
																<TableCell align="right">{moment(orderDetail.createdAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
															</TableRow>
															<TableRow key="Duration Type">
																<TableCell align="left">Duration Type</TableCell>
																<TableCell align="right">{orderDetail.orderProduct[0].durationType}</TableCell>
															</TableRow>
															<TableRow key="Duration">
																<TableCell align="left">Duration</TableCell>
																<TableCell align="right">{orderDetail.orderProduct[0].duration}</TableCell>
															</TableRow>
															<TableRow key="Return Date">
																<TableCell align="left">Return Date</TableCell>
																<TableCell align="right">{moment(orderDetail.createdAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
															</TableRow>
															<TableRow key="Payment Type">
																<TableCell align="left">Payment Type</TableCell>
																<TableCell align="right">{orderDetail.paymentType}</TableCell>
															</TableRow>
															<TableRow key="Payment Id">
																<TableCell align="left">Payment Id</TableCell>
																<TableCell align="right">{orderDetail.paymentId}</TableCell>
															</TableRow>
														</TableBody>
													</Table>
												</Box>
											</Collapse>
										</TableCell>
									</TableRow>

									<TableRow>
										<TableCell>
											<IconButton aria-label="expand row" size="small" onClick={() => setOpenPriceDetail(!openPriceDetail)}>
												{openPriceDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
											</IconButton>
										</TableCell>
										<TableCell align="left" ><b>Price Details</b></TableCell>
									</TableRow>
									<TableRow>
										<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
											<Collapse in={openPriceDetail} timeout="auto" unmountOnExit>
												<Box margin={1}>
													<Table size="small" aria-label="purchases">
														<TableBody>
															<TableRow key={"itemCost"}>
																<TableCell align="left">Item Cost</TableCell>
																<TableCell align="right">{orderDetail.orderProduct[0].cost}</TableCell>
															</TableRow>
															<TableRow key={"itemCount"}>
																<TableCell align="left">Item Count</TableCell>
																<TableCell align="right">{orderDetail.orderProduct[0].count}</TableCell>
															</TableRow>
															<TableRow key={"cost"}>
																<TableCell align="left">Final Cost</TableCell>
																<TableCell align="right">{orderDetail.cost}</TableCell>
															</TableRow>
														</TableBody>
													</Table>
												</Box>
											</Collapse>
										</TableCell>
									</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
					</PerfectScrollbar>
				</Grid>
			</Grid>
			</>}
			{
				loading && <p>Loading...</p>
			}
		</div>
	);
};

OrderDetail.propTypes = {
	className: PropTypes.string,
	orders: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired
};

export default OrderDetail;
