import axios from 'axios';

const endpoint = `${import.meta.env.VITE_BASEURL}/v1`;

const getAllTravelSpots = async () => {
  const response = await axios.get(`${endpoint}/discover`);

  return response.data;
};

const getDetailTravelSpots = async (travelSpotId) => {
  const response = await axios.get(`${endpoint}/discover/${travelSpotId}`);

  return response.data;
};

const authService = { getAllTravelSpots, getDetailTravelSpots };

export default authService;
