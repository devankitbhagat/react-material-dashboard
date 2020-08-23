import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import {
	Card,
	CardContent
} from '@material-ui/core';
import MaterialTable from 'material-table';
import {addPrice, updatePrice} from '../../../../Models/Price';

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

const PriceTable = props => {
	const { className, users, loading, ...rest } = props;
	const classes = useStyles();

	const [state, setState] = React.useState({
		columns: [
			{
				title: 'Id', field: 'id',
				editable: 'never',
			},
			{
				title: 'Duration Type', field: 'durationType',
				lookup: { 'month': 'Month', 'day': 'Day', 'year': 'Year' },
			},
			{ title: 'Duration', field: 'duration', type: 'numeric' },
			{ title: 'Price', field: 'price', type: 'numeric' },
			{
				title: 'Status', field: 'status',
				lookup: { 'active': 'Active', 'deleted': 'Deleted' },
			}
		],
		data: props.prices,
	});

	React.useEffect(() => {
		setState({
			columns: [
				{
					title: 'Id', field: 'id',
					editable: 'never',
				},
				{
					title: 'Duration Type', field: 'durationType',
					lookup: { 'month': 'Month', 'day': 'Day', 'year': 'Year' },
				},
				{ title: 'Duration', field: 'duration', type: 'numeric' },
				{ title: 'Price', field: 'price', type: 'numeric' },
				{
					title: 'Status', field: 'status',
					lookup: { 'active': 'Active', 'deleted': 'Deleted' },
				}
			],
			data: props.prices,
		})
	}, [props.prices])

	const handleAddPrice = async (newData) => {
		const res = await addPrice({...newData, itemId: props.itemId});
		if(res && res.data) {
			setState((prevState) => {
				const data = [...prevState.data];
				data.push({...newData, id: res.data.id});
				return { ...prevState, data };
			});
		}
	}

	const handleUpdatePrice = async (newData, oldData) => {
		await updatePrice(oldData.id, {...newData, itemId: props.itemId});
		if (oldData) {
			setState((prevState) => {
				const data = [...prevState.data];
				data[data.indexOf(oldData)] = newData;
				return { ...prevState, data };
			});
		}
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
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardContent className={classes.content}>
				<PerfectScrollbar>
					<div className={classes.inner}>
						{loading && rowSkeleton()}
						{!loading && (
							<MaterialTable
								title="Price List"
								columns={state.columns}
								data={state.data}
								editable={{
									onRowAdd: (newData) => handleAddPrice(newData),
									onRowUpdate: (newData, oldData) => handleUpdatePrice(newData, oldData),
								}}
							/>

						)}
					</div>
				</PerfectScrollbar>
			</CardContent>
		</Card>
	);
};

PriceTable.propTypes = {
	className: PropTypes.string,
	prices: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	itemId: PropTypes.number
};

export default PriceTable;
