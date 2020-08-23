import { axiosInstance } from '../axios.interceptor';
import { LIST_ORDER, GET_ORDER, UPDATE_ORDER } from '../routes';

export const listOrders = async () => {
  return axiosInstance.get(LIST_ORDER);
};

export const getOrderDetail = async (id) => {
  return axiosInstance.get(`${GET_ORDER}/${id}`);
};

export const updateOrder = async (id, data) => {
  return axiosInstance.post(`${UPDATE_ORDER}/${id}`, data);
};
