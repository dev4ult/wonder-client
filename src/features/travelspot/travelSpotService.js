import axios from 'axios';

const endpoint = import.meta.env.VITE_BASEURL;

const getTravelSpots = async () => {
  const response = await axios.get(`${endpoint}/discover`);

  return response.data;
};

const getTravelSpotsAdmin = async (token_id) => {
  const response = await axios.get(`${endpoint}/discover-admin`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token_id}`,
    },
  });

  return response.data;
};

const getTravelSpotsByUserLike = async (user_id, token_id) => {
  const response = await axios.get(`${endpoint}/discover/liked/${user_id}}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token_id}`,
    },
  });

  return response.data;
};

const getTravelSpotDetail = async (travelspot_id, token = '') => {
  const response = await axios.get(`${endpoint}/discover/${travelspot_id}${token != '' ? `?token_id=${token}` : ''}`);

  return response.data;
};

const getTravelSpotDetailAdmin = async (travelspot_id, token_id) => {
  const response = await axios.get(`${endpoint}/discover-admin/${travelspot_id}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token_id}`,
    },
  });

  return response.data;
};

const addTravelSpot = async (travelspot_detail, token_id) => {
  const { photos: foto, name: nama, description: deskripsi, address: alamat_lengkap, city: kab_kota, province: provinsi, country: negara, scope: lingkup, facilities: fasilitas, content: konten_blog } = travelspot_detail;

  const response = await axios.post(
    `${endpoint}/discover-admin`,
    { nama, deskripsi, alamat_lengkap, kab_kota, provinsi, fasilitas, foto, negara, lingkup, konten_blog },
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token_id}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data.message;
};

const updateTravelSpot = async (travelspot_detail, travelspot_id, token_id) => {
  const { photos: foto, name: nama, description: deskripsi, address: alamat_lengkap, city: kab_kota, province: provinsi, country: negara, scope: lingkup, content: konten_blog, facilities: fasilitas } = travelspot_detail;

  const data = {
    _method: 'PUT',
    nama,
    deskripsi,
    alamat_lengkap,
    kab_kota,
    provinsi,
    fasilitas,
    negara,
    lingkup,
    konten_blog,
  };

  if (foto.length != 0 && typeof foto[0] != 'string') {
    data['foto'] = foto;
  }

  const response = await axios.post(`${endpoint}/discover-admin/${travelspot_id}`, data, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token_id}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.message;
};

const deleteTravelSpot = async (travelspot_id, token_id) => {
  const response = await axios.delete(`${endpoint}/discover-admin/${travelspot_id}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token_id}`,
    },
  });

  return response.data.message;
};

const travelSpotService = {
  getTravelSpots,
  getTravelSpotsByUserLike,
  getTravelSpotDetail,
  getTravelSpotDetailAdmin,
  addTravelSpot,
  updateTravelSpot,
  deleteTravelSpot,
  getTravelSpotsAdmin,
};

export default travelSpotService;
