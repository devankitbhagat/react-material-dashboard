import { axiosInstance } from '../axios.interceptor';
import { LIST_FAQ, ADD_FAQ, UPDATE_FAQ } from '../routes';

export const listFAQs = async (id) => {
  return axiosInstance.get(LIST_FAQ);
};

export const addFAQs = async (data) => {
  return axiosInstance.post(ADD_FAQ, data);
};

export const updateFAQs = async (id, data) => {
  return axiosInstance.post(`${UPDATE_FAQ}/${id}`, data);
};
