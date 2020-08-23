import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Typography,
  Collapse
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { signIn } from '../../Models/Auth';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.primary.main,
    height: '98%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    margin: '1%',
    borderRadius: '20px'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.secondary.main,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.secondary.main
  },
  bio: {
    color: theme.palette.secondary.main
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  alert: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('error');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(true);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(false);
  };

  const invalidCredentials = {
    title: 'Incorrect credentials!',
    message:
      'You have entered incorrect credentials, please enter correct credentials.'
  };

  const error = {
    title: 'Duh Uh!',
    message: 'Something went wrong! Please try again after sometime.'
  };

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
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

  const handleSignIn = event => {
    event.preventDefault();
    setLoading(true);
    signIn(formState.values)
      .then(res => {
        const response = res.data;
        setLoading(false);
        const token = response.token;
        window.sessionStorage.setItem('user', JSON.stringify({ token }));
        history.push('/');
      })
      .catch(e => {
        setAlertType('error');
        setLoading(false);
        if (
          e &&
          e.response &&
          e.response.data &&
          e.response.data.error === 'Unauthorized'
        ) {
          setShowAlert(true);
          setAlertMessage(invalidCredentials.message);
          setAlertTitle(invalidCredentials.title);
        } else {
          setShowAlert(true);
          setAlertMessage(error.message);
          setAlertTitle(error.title);
        }
      });
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1">
                Your Second Home Admin Panel
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSignIn}>
                <Typography className={classes.title} variant="h2">
                  Sign in
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Login to your account using your email
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email address"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  value={formState.values.password || ''}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Collapse in={showAlert}>
                  <Alert severity={alertType} className={classes.alert}>
                    <AlertTitle>{alertTitle}</AlertTitle>
                    {alertMessage}
                  </Alert>
                </Collapse>
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid || loading}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained">
                  Sign in
                </Button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
