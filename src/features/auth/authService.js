import axios from 'axios';

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

const getUserDetail = async (user_id) => {
  const token_id = getCookie('w_token_id');
  const response = await axios.get(`${endpoint}/profile/${user_id}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token_id}`,
    },
  });

  return response.data.data;
};

const setLoginCookie = async () => {
  const token_id = getCookie('w_token_id');

  if (token_id == null) {
    return null;
  } else {
    const user_id = getCookie('w_user_id');

    const response = await axios.get(`${endpoint}/profile/${user_id}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token_id}`,
      },
    });

    const user = {
      w_user_id: user_id,
      w_username: getCookie('w_username'),
      w_token_id: token_id,
    };

    user.role = response.data.data.role;

    return user;
  }
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

function setCookie(name, value, daysToLive) {
  const date = new Date();
  date.setTime(date.getTime() + daysToLive + 24 * 60 * 60 * 1000);
  let expires = `expires=${date.toUTCString()}`;

  document.cookie = `${name}=${value}; ${expires};`;
}

function getCookie(name) {
  const cDecoded = decodeURIComponent(document.cookie);
  const cArray = cDecoded.split('; ');
  let result = null;

  cArray.forEach((e) => {
    if (e.indexOf(name) == 0) {
      result = e.substring(name.length + 1);
    }
  });

  return result;
}

function deleteCookie(name) {
  document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

const authService = { login, setLoginCookie, logout, register };

export default authService;
