import axios from 'axios';

const endpoint = import.meta.env.VITE_REGION_API;

const getProvinces = async () => {
  const response = await axios.get(`${endpoint}/provinces.json`);

  return response.data;
};

const getCities = async (province_id) => {
  const response = await axios.get(`${endpoint}/regencies/${province_id}.json`);

  return response.data;
};

const regionService = { getProvinces, getCities };

export default regionService;
