import api from './api';

export const registerUser = (payload) => 
  api.post('/auth/register', payload)
    .then((res) => res.data)
    .catch((error) => {
      const message = error.response?.data?.error || error.message || 'Registration failed';
      throw { response: { data: { error: message } } };
    });

export const loginUser = (payload) => 
  api.post('/auth/login', payload)
    .then((res) => res.data)
    .catch((error) => {
      const message = error.response?.data?.error || error.message || 'Login failed';
      throw { response: { data: { error: message } } };
    });
