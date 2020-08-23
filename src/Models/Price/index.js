import { axiosInstance } from '../axios.interceptor';
import { LIST_PRICE, ADD_PRICE, UPDATE_PRICE } from '../routes';

export const listPrice = async (id) => {
  return axiosInstance.get(`${LIST_PRICE}/${id}`);
};

export const addPrice = async (data) => {
  return axiosInstance.post(ADD_PRICE, data);
};

export const updatePrice = async (id, data) => {
  return axiosInstance.post(`${UPDATE_PRICE}/${id}`, data);
};
