import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import { addItem, updateItem } from '../../../../Models/Item';
import Upload from '../../../../common/upload';
import { isEmpty, pick } from "lodash";
import { useLocation } from "react-router-dom";

import {
	Card,
	CardContent,
	CardActions,
	Divider,
	Grid,
	Button,
	TextField,
	MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
	root: {},
	uploadButton: {
		marginTop: '8px'
	}
}));

const schema = {
	title: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 32
		}
	},
	categoryId: {
		presence: { allowEmpty: false, message: 'is required' },
	},
	length: {
		presence: false,
	},
	breadth: {
		presence: false
	},
	height: {
		presence: false
	},
	image: {
		presence: { allowEmpty: false, message: 'is required' }
	},
	status: {
		presence: { allowEmpty: false, message: 'is required' }
	}
};

const ItemForm = props => {
	const { className, ...rest } = props;
	const location = useLocation();
	const history = useHistory();
	const classes = useStyles();
	const keys = ['image', 'categoryId', 'status', 'length', 'breadth', 'height', 'title'];

	const [formState, setFormState] = useState({
		isValid: false,
		values: { status: 'active', categoryId: 1 },
		touched: {},
		errors: {}
	});

	const addImage = (url) => {
		setFormState(formState => ({
			...formState,
			values: Object.assign({}, formState.values, { "image": url })
		}));
	}

	useEffect(() => {
		if(location.state && location.state.item) {
			setFormState(formState => ({
				...formState,
				values: Object.assign({},  pick(location.state.item, keys))
			}));
		}
 }, [location]);

	const handleSubmit = async () => {
		if(location && location.state && location.state.item) {
			await updateItem(location.state.item.id, formState.values)
		} else {
			await addItem(formState.values)
		}
		history.push('/items');
	};

	useEffect(() => {
		let errors = validate(formState.values, schema);
		if (formState.values.categoryId === 2) {
			errors = errors ? errors : {};
			errors.length = !formState.values.length ? ['Length is required for carton type'] : null;
			errors.breadth = !formState.values.breadth ? ['Breadth is required for carton type'] : null;
			errors.height = !formState.values.height ? ['Height is required for carton type'] : null;

			!errors.height && delete errors.height;
			!errors.breadth && delete errors.breadth;
			!errors.length && delete errors.length;
		} else {
			errors && delete errors.length;
			errors && delete errors.breadth;
			errors && delete errors.height;
		}

		setFormState(formState => ({
			...formState,
			isValid: errors && !isEmpty(errors) ? false : true,
			errors: errors || {}
		}));
	}, [formState.values]);

	const handleChange = event => {
		event.persist();

		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				[event.target.name]:
					event.target.type === 'checkbox'
						? event.target.checked
						: event.target.value
			},
			touched: {
				...formState.touched,
				[event.target.name]: true
			}
		}));
	};

	const hasError = field => formState.errors[field] ? true : false;

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<form autoComplete="off" noValidate>
				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={6} xs={12}>
							<TextField
								error={hasError('title')}
								fullWidth
								label="Title"
								margin="dense"
								name="title"
								helperText={
									hasError('title') ? formState.errors.title[0] : null
								}
								onChange={handleChange}
								required
								value={formState.values.title || ''}
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								error={hasError('categoryId')}
								fullWidth
								id="select"
								value={formState.values.categoryId || 1}
								onChange={handleChange}
								name="categoryId"
								label="Category"
								margin="dense"
								required
								variant="outlined"
								helperText={
									hasError('categoryId') ? formState.errors.categoryId[0] : null
								}
								select
							>
								<MenuItem value={1}>
									House
                </MenuItem>
								<MenuItem value={2}>Carton</MenuItem>
								<MenuItem value={3}>Automobile</MenuItem>
							</TextField>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								error={hasError('length')}
								fullWidth
								label="Length"
								type="number"
								margin="dense"
								helperText={hasError('length') ? formState.errors.length[0] : null}
								name="length"
								onChange={handleChange}
								value={formState.values.length || ''}
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								error={hasError('breadth')}
								fullWidth
								label="Breadth"
								margin="dense"
								name="breadth"
								helperText={
									hasError('breadth')
										? formState.errors.breadth[0]
										: null
								}
								onChange={handleChange}
								type="number"
								value={formState.values.breadth || ''}
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								error={hasError('height')}
								fullWidth
								label="Height"
								margin="dense"
								name="height"
								type="number"
								helperText={
									hasError('height') ? formState.errors.height[0] : null
								}
								onChange={handleChange}
								value={formState.values.height || ''}
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								error={hasError('status')}
								fullWidth
								name="status"
								value={formState.values.status || 'active'}
								onChange={handleChange}
								label="Status"
								variant="outlined"
								margin="dense"
								required
								helperText={
									hasError('status') ? formState.errors.status[0] : null
								}
								select
							>
								<MenuItem value={'active'}>
									Active
                </MenuItem>
								<MenuItem value={'deleted'}>Deleted</MenuItem>
							</TextField>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								error={hasError('image')}
								fullWidth
								label="Image"
								margin="dense"
								name="image"
								disabled
								helperText={
									hasError('image') ? formState.errors.image[0] : null
								}
								onChange={handleChange}
								value={formState.values.image || ''}
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<Upload directory="item" onSave={addImage} />
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<CardActions>
					<Button
						color="primary"
						onClick={handleSubmit}
						disabled={!formState.isValid}
						variant="contained">
						Save Item
          </Button>
				</CardActions>
			</form>
		</Card>
	);
};

ItemForm.propTypes = {
	className: PropTypes.string
};

export default ItemForm;
