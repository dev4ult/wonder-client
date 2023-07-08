import axios from 'axios';

const endpoint = import.meta.env.VITE_BASEURL;

const getAdmins = async (token_id) => {
  const response = await axios.get(`${endpoint}/admin`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token_id}`,
    },
  });

  return response.data.data;
};

const getAdminDetail = async (admin_id, token_id) => {
  const response = await axios.get(`${endpoint}/admin/${admin_id}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token_id}`,
    },
  });

  return response.data.credentials;
};

const userService = { getAdmins, getAdminDetail };

export default userService;
