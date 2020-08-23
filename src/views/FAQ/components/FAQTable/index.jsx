import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import {
	Card,
	CardContent,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import MaterialTable from 'material-table';
import {addFAQs, updateFAQs} from '../../../../Models/FAQ';

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

const FAQTable = props => {
	const { className, users, loading, ...rest } = props;
	const classes = useStyles();

  const columns = [
    {
      title: 'Id', field: 'id',
      editable: 'never',
    },
    { title: 'Question', field: 'question', type: 'string', editComponent: props => (
			<TextField
				type="text"
				multiline
        rows={4}
        variant="outlined"
				value={props.value}
				fullWidth
				onChange={e => props.onChange(e.target.value)}
			/>),
		cellStyle: {
			minWidth: 400,
		}
	},
    { title: 'Answer', field: 'answer', type: 'string', editComponent: props => (
			<TextField
				type="text"
				multiline
        rows={4}
        variant="outlined"
				value={props.value}
				fullWidth
				onChange={e => props.onChange(e.target.value)}
			/>
	),
	cellStyle: {
		minWidth: 400,
	} },
    {
      title: 'Status', field: 'status',
      lookup: { 'active': 'Active', 'deleted': 'Deleted' },
    }
  ];

	const [state, setState] = React.useState({
		columns: columns,
		data: props.faqs,
	});

	React.useEffect(() => {
		setState({
			columns: columns,
			data: props.faqs,
		})
	}, [props.faqs])

	const handleAddFaq = async (newData) => {
		const res = await addFAQs({...newData});
		if(res && res.data) {
			setState((prevState) => {
				const data = [...prevState.data];
				data.push({...newData, id: res.data.id});
				return { ...prevState, data };
			});
		}
	}

	const handleUpdateFaq = async (newData, oldData) => {
		await updateFAQs(oldData.id, {...newData, itemId: props.itemId});
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
								title="FAQ List"
								columns={state.columns}
								data={state.data}
								editable={{
									onRowAdd: (newData) => handleAddFaq(newData),
									onRowUpdate: (newData, oldData) => handleUpdateFaq(newData, oldData),
								}}
							/>

						)}
					</div>
				</PerfectScrollbar>
			</CardContent>
		</Card>
	);
};

FAQTable.propTypes = {
	className: PropTypes.string,
	faqs: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default FAQTable;
