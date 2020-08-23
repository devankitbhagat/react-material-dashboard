import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import { addBanner, updateBanner } from '../../../../Models/Banner';
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
	fileName: {
		presence: { allowEmpty: false, message: 'is required' }
	},
	status: {
		presence: { allowEmpty: false, message: 'is required' }
	}
};

const BannerForm = props => {
	const { className, ...rest } = props;
	const location = useLocation();
	const history = useHistory();
	const classes = useStyles();
	const keys = ['fileName', 'status'];

	const [formState, setFormState] = useState({
		isValid: false,
		values: { status: 'active' },
		touched: {},
		errors: {}
	});

	const addImage = (url) => {
		setFormState(formState => ({
			...formState,
			values: Object.assign({}, formState.values, { "fileName": url })
		}));
	}

	useEffect(() => {
		if(location.state && location.state.banner) {
			setFormState(formState => ({
				...formState,
				values: Object.assign({},  pick(location.state.banner, keys))
			}));
		}
 }, [location]);

	const handleSubmit = async () => {
		if(location && location.state && location.state.banner) {
			await updateBanner(location.state.banner.id, formState.values)
		} else {
			await addBanner(formState.values)
		}
		history.push('/banners');
	};

	useEffect(() => {
		let errors = validate(formState.values, schema);
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
            <Grid item md={4} xs={12}>
              <TextField
                error={hasError('fileName')}
                fullWidth
                label="Image"
                margin="dense"
                name="fileName"
                disabled
                helperText={
                  hasError('fileName') ? formState.errors.fileName[0] : null
                }
                onChange={handleChange}
                value={formState.values.fileName || ''}
                variant="outlined"
              />
            </Grid>
            <Grid item md={3} xs={12} style={{marginTop: '9px'}}>
              <Upload directory="banner" onSave={addImage}/>
            </Grid>
						<Grid item md={4} xs={12}>
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

BannerForm.propTypes = {
	className: PropTypes.string
};

export default BannerForm;
