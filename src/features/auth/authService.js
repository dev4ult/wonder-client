import axios from 'axios';

const endpoint = import.meta.env.VITE_BASEURL;

const login = async (email, password) => {
  const response = await axios.post({ email, password }, `${endpoint}/login`);

  return response.data;
};

const logout = async () => {
  const response = await axios.get(`${endpoint}/logout`);

  return response.data;
};

const register = async (data) => {};

const authService = { login, logout, register };

export default authService;
