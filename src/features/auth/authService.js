import axios from 'axios';
import { setCookie, getCookie, deleteCookie } from './cookieFunc';

const endpoint = import.meta.env.VITE_BASEURL;
const firshit = import.meta.env.VITE_FIRSTHIT;

const index = async () => {
  axios.defaults.withCredentials = true;

  const response = await axios.get(`${firshit}/sanctum/csrf-cookie`);

  console.log(response);
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${endpoint}/login`, JSON.stringify({ email, password }), {
    headers: {
      'content-type': 'application/json',
    },
  });

  // const response = await fetch(`${endpoint}/login`, {
  //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //   },
  //   body: { email, password }, // body data type must match "Content-Type" header
  // });

  // console.log(response.json());

  if (response.data) {
    const { token_id } = response.data;
    const { username, id, email, role, foto } = response.data.user;

    setCookie('w_user_id', id, 30);
    setCookie('w_username', username, 30);
    setCookie('w_token_id', token_id, 30);
    setCookie('w_foto', foto, 30);

    const user = {
      w_user_id: id,
      w_username: username,
      w_token_id: token_id,
      email,
      role,
      w_foto: foto,
    };

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

  const { username, email, role, bio, foto } = response.data.data;

  const user = {
    w_user_id: user_id,
    w_username: username,
    w_token_id: token_id,
    email,
    role,
    bio,
    w_foto: foto,
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

  return response.data.message;
};

const register = async (username, email, password) => {
  const response = await axios.post(
    `${endpoint}/registration`,
    { username, email, password, role: 'visitor' },
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );

  return response.data.message;
};

const authService = { index, login, setUserDetail, logout, register };

export default authService;
