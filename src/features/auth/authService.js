import axios from 'axios';

const endpoint = import.meta.env.VITE_BASEURL;

const login = async (email, password) => {
  const response = await axios.post(`${endpoint}/login`, JSON.stringify({ email: email, password: password }), {
    headers: {
      'content-type': 'application/json',
    },
  });

  if (response.data) {
    const token_id = response.data;
    const { username, email } = response.data.user;
    const user = { username, email, token_id };

    localStorage.setItem('user', JSON.stringify(user));

    return user;
  }

  return response.data;
};

const logout = async () => {
  const response = await axios.get(`${endpoint}/logout`);

  localStorage.removeItem('user');

  return response.data;
};

const register = async (data) => {};

const authService = { login, logout, register };

export default authService;
