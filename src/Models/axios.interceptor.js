import Axios from 'axios';
import { browserHistory } from '../App'

const axiosInstance = Axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_API_URL
});

const axiosPublicInstance = Axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_API_URL
});

const axiosRawInstance = Axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_API_URL
});

const isAuthEnabled = config => {
  // eslint-disable-next-line no-prototype-builtins
  return config.hasOwnProperty('authEnabled') && !config.authEnabled
    ? false
    : true;
};

const requestHandler = request => {
  if (isAuthEnabled(request)) {
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    request.headers['Content-Type'] = 'application/json';
    if (user) request.headers['Authorization'] = `Bearer ${user.token}`;
  }
  return request;
};

const errorHandler = async (error, checkUnauthorized = true) => {
  if (error.response && error.response.status === 401) {
    if(window) {
      window.sessionStorage.removeItem('user');
    }
    browserHistory.push('sign-in');
  } else {
    return Promise.reject(error);
  }
};

const successHandler = response => {
  return response;
};

axiosInstance.interceptors.request.use(request => requestHandler(request));

axiosInstance.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
);

axiosPublicInstance.interceptors.response.use(
  response => successHandler(response),
  // should not check 401 error for public API's
  error => errorHandler(error, false)
);

export { axiosInstance, axiosPublicInstance, axiosRawInstance };
