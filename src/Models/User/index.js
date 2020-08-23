import { axiosInstance } from '../axios.interceptor';
import { LIST_USERS } from '../routes';

export const listUsers = async () => {
  return  axiosInstance.get(LIST_USERS);
};
