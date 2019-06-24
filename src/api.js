import axios from 'axios';
import history from './history.js';

const serverErrors = {
  accessForbidden: 403,
  badRequest: 400,
};

export const createAPI = () => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (error) => {
    switch (error.response.status) {
      case serverErrors.accessForbidden:
        history.push(`/login`);
        break;
      default:
        history.push(`/error`);
        break;
    }

    return error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
