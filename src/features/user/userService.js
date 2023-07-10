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

  console.log({ nama_lengkap, jenis_kelamin, no_telepon, alamat, nik, foto, username, email, password, role });

  const formData = new FormData();
  formData.append('nama_lengkap', 'Nibras Alyassar');
  formData.append('jenis_kelamin', 'female');
  formData.append('no_telepon', '129038123s');
  formData.append('alamat', 'ROK');
  formData.append('nik', 12312124123);
  formData.append('file', foto);
  formData.append('foto', foto);
  formData.append('username', 'siSarbin');
  formData.append('email', 'nibrasbiasa@gmail.com');
  formData.append('password', 'nibras123');
  formData.append('role', 'superadmin');

  const response = await axios.post(`${endpoint}/admin`, formData, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token_id}`,
    },
  });

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

  return response.data;
};

const userService = { getAdmins, getAdminDetail, addAdmin, updateAdmin };

export default userService;
