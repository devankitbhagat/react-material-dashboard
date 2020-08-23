import { axiosInstance } from '../axios.interceptor';
import { LIST_ITEM, ADD_ITEM, UPDATE_ITEM } from '../routes';

export const listItems = async () => {
  return axiosInstance.get(LIST_ITEM);
};

export const addItem = async (data) => {
  return axiosInstance.post(ADD_ITEM, data);
};

export const updateItem = async (id, data) => {
  return axiosInstance.post(`${UPDATE_ITEM}/${id}`, data);
};
