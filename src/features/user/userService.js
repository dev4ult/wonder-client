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

const addAdmin = async (admin_detail, token_id) => {
  const { fullname: nama_lengkap, gender: jenis_kelamin, phone: no_telepon, address: alamat, nik, photo: foto, username, email, password, role } = admin_detail;

  const response = await axios.post(
    `${endpoint}/admin`,
    { nama_lengkap, jenis_kelamin, no_telepon, alamat, nik, foto, username, email, password, role },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Bearer ${token_id}`,
      },
    }
  );

  return response.data.message;
};

const updateAdmin = async (admin_detail, admin_id, token_id) => {
  const { fullname: nama_lengkap, gender: jenis_kelamin, phone: no_telepon, address: alamat, nik, photo: foto } = admin_detail;

  const response = await axios.post(
    `${endpoint}/admin/${admin_id}`,
    { _method: 'PUT', nama_lengkap, jenis_kelamin, no_telepon, alamat, nik, foto },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token_id}`,
      },
    }
  );

  return response.data.message;
};

const deleteAdmin = async (admin_id, token_id) => {
  const response = await axios.delete(`${endpoint}/admin/${admin_id}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token_id}`,
    },
  });

  return response.data.message;
};

const updateProfile = async (data, user_id, token_id) => {
  const response = await axios.post(
    `${endpoint}/profile/${user_id}`,
    {},
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token_id}`,
      },
    }
  );

  return response.data;
};

const userService = { getAdmins, getAdminDetail, addAdmin, updateAdmin, deleteAdmin };

export default userService;
