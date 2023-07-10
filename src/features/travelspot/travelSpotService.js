import axios from 'axios';

const endpoint = import.meta.env.VITE_BASEURL;

const getTravelSpots = async () => {
  const response = await axios.get(`${endpoint}/discover`);

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

const getTravelSpotsAdmin = async () => {
  const response = await axios.get(`${endpoint}/discover-admin`);

  return response.data;
};

const getTravelSpotDetail = async (travelspot_id) => {
  const response = await axios.get(`${endpoint}/discover/${travelspot_id}`);

  return response.data;
};

const addTravelSpot = async (travelspot_detail, token_id) => {
  const { photos: foto, name: nama, description: deskripsi, address: alamat_lengkap, city: kab_kota, province: provinsi, fasilities: fasilitas } = travelspot_detail;

  const response = await axios.post(
    `${endpoint}/discover-admin`,
    { nama, deskripsi, alamat_lengkap, kab_kota, provinsi, fasilitas, foto },
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token_id}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

const updateTravelSpot = async (travelspot_detail, travelspot_id, token_id) => {
  const { photos: foto, name: nama, description: deskripsi, address: alamat_lengkap, city: kab_kota, province: provinsi, fasilities: fasilitas } = travelspot_detail;

  const response = await axios.post(
    `${endpoint}/discover-admin/${travelspot_id}`,
    { _method: 'PUT', nama, deskripsi, alamat_lengkap, kab_kota, provinsi, fasilitas, foto },
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token_id}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

const deleteTravelSpot = async (travelspot_id, token_id) => {
  const response = await axios.delete(`${endpoint}/discover-admin/${travelspot_id}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token_id}`,
    },
  });

  return response.data;
};

const travelSpotService = {
  getTravelSpots,
  getTravelSpotsByUserLike,
  getTravelSpotDetail,
  addTravelSpot,
  updateTravelSpot,
  deleteTravelSpot,
  getTravelSpotsAdmin,
};

export default travelSpotService;
