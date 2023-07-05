import axios from 'axios';

const endpoint = `${import.meta.env.VITE_BASEURL}/v1`;

const getAllTravelSpots = async () => {
  const response = await axios.get(`${endpoint}`);

  return response.data;
};

const authService = { getAllTravelSpots };

export default authService;
