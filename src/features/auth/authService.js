import axios from 'axios';
import { setCookie, getCookie, deleteCookie } from './cookieFunc';

const endpoint = import.meta.env.VITE_BASEURL;

const login = async (email, password) => {
  const response = await axios.post(`${endpoint}/login`, JSON.stringify({ email: email, password: password }), {
    headers: {
      'content-type': 'application/json',
    },
  });

  if (response.data) {
    const { token_id } = response.data;
    const { username, id, role } = response.data.user;

    setCookie('w_user_id', id, 30);
    setCookie('w_username', username, 30);
    setCookie('w_token_id', token_id, 30);

    const user = {
      w_user_id: id,
      w_username: username,
      w_token_id: token_id,
    };

    user.role = role;

    return user;
  }

  return response.data;
};

const setUserDetail = async (token_id, user_id) => {
  const response = await axios.get(`${endpoint}/profile/${user_id}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token_id}`,
    },
  });

  const { username, role } = response.data.data;

  const user = {
    w_user_id: user_id,
    w_username: username,
    w_token_id: token_id,
    role,
  };

  return user;
};

const logout = async () => {
  const response = await axios.post(
    `${endpoint}/logout`,
    {},
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${getCookie('w_token_id')}`,
      },
    }
  );

  deleteCookie('w_user_id');
  deleteCookie('w_username');
  deleteCookie('w_token_id');

  return response.data;
};

const register = async (data) => {};

const authService = { login, setUserDetail, logout, register };

export default authService;
