import { axiosPublicInstance, axiosInstance } from '../axios.interceptor';
import { SIGNIN_URL, LOGOUT_URL } from '../routes';

export const signIn = async data => {
  return  axiosPublicInstance.post(SIGNIN_URL,  data);
};

export const logout = async () => {
  return  axiosInstance.post(LOGOUT_URL);
};