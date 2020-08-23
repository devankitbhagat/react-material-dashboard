import { axiosInstance } from '../axios.interceptor';
import { LIST_BANNER, ADD_BANNER, UPDATE_BANNER } from '../routes';

export const listBanner = async (id) => {
  return axiosInstance.get(LIST_BANNER);
};

export const addBanner = async (data) => {
  return axiosInstance.post(ADD_BANNER, data);
};

export const updateBanner = async (id, data) => {
  return axiosInstance.post(`${UPDATE_BANNER}/${id}`, data);
};
