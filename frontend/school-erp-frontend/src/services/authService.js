import axios from 'axios';

const API_URL = '/api/auth/';

const login = (email, password) => {
  return axios.post(API_URL + 'login', { email, password });
};

const forgotPassword = (email) => {
  return axios.post(API_URL + 'forgot-password', { email });
};

export { login, forgotPassword };
