import axios from 'axios';

const endpoint = import.meta.env.VITE_BASEURL;

function setCookie(name, value, daysToLive) {
  const date = new Date();
  date.setTime(date.getTime() + daysToLive + 24 * 60 * 60 * 1000);
  let expires = `expires=${date.toUTCString()}`;

  document.cookie = `${name}=${value}; ${expires};`;
}

const login = async (email, password) => {
  const response = await axios.post(`${endpoint}/login`, JSON.stringify({ email: email, password: password }), {
    headers: {
      'content-type': 'application/json',
    },
  });

  if (response.data) {
    const { token_id } = response.data;
    const { username, email, id, role } = response.data.user;

    setCookie('w_user_id', id, 30);
    setCookie('w_username', username, 30);
    setCookie('w_email', email, 30);
    setCookie('w_token_id', token_id, 30);

    const user = {
      w_user_id: id,
      w_username: username,
      w_email: email,
      w_token_id: token_id,
    };

    sessionStorage.setItem('user', JSON.stringify(user));

    user.role = role;

    return user;
  }

  return response.data;
};

const setLoginSession = async () => {
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
      w_email: getCookie('w_email'),
      w_token_id: token_id,
    };

    sessionStorage.setItem('user', JSON.stringify(user));

    user.role = response.data.data.role;

    return user;
  }
};

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

  sessionStorage.removeItem('user');

  deleteCookie('w_user_id');
  deleteCookie('w_username');
  deleteCookie('w_email');
  deleteCookie('w_token_id');

  return response.data;
};

const register = async (data) => {};

const authService = { login, setLoginSession, logout, register };

export default authService;
