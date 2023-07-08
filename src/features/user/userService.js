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

const userService = { getAdmins };

export default userService;
