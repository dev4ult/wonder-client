import axios from 'axios';

const endpoint = `${import.meta.env.VITE_BASEURL}/v1`;

const login = async (email, password) => {
  const response = await axios.post({ email, password }, `${endpoint}/login`);

  return response.data;
};

const register = async (data) => {};

const authService = { login, register };

export default authService;
