import { axiosInstance } from '../axios.interceptor';
import { UPLOAD_FILE, APP_CONFIG } from '../routes';

export const uploadImage = async (directory, file) => {
	const formData = new FormData(); // instantiate it
	formData.set('file', file);

	return axiosInstance.post(`${UPLOAD_FILE}?fileType=${directory}`, formData, {
		headers: {
			'content-type': 'multipart/form-data'
		}
	});
};

export const getAppConfig = async () => {
  return axiosInstance.get(APP_CONFIG);
};
