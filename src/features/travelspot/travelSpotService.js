import axios from 'axios';

const endpoint = import.meta.env.VITE_BASEURL;

const getTravelSpots = async () => {
  const response = await axios.get(`${endpoint}/discover`);

  return response.data;
};

const getTravelSpotsAdmin = async () => {
  const response = await axios.get(`${endpoint}/discover-admin`);

  return response.data;
};

const getTravelSpotDetail = async (travelSpotId) => {
  const response = await axios.get(`${endpoint}/discover/${travelSpotId}`);

  return response.data;
};

const newTravelSpot = async (travelSpotDetail, token_id) => {
  const { photos: foto, name: nama, description: deskripsi, address: alamat_lengkap, city: kab_kota, province: provinsi, fasilities: fasilitas } = travelSpotDetail;

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

const travelSpotService = { getTravelSpots, getTravelSpotDetail, newTravelSpot };

export default travelSpotService;
