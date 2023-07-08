import axios from 'axios';

const endpoint = import.meta.env.VITE_REGION_API;

const getProvinces = async () => {
  const response = await axios.get(`${endpoint}/provinces.json`);

  return response.data;
};

const getCities = async (provinceId) => {
  const response = await axios.get(`${endpoint}/regencies/${provinceId}.json`);

  return response.data;
};

const regionService = { getProvinces, getCities };

export default regionService;
