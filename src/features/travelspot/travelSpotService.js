import axios from 'axios';

const endpoint = import.meta.env.VITE_BASEURL;

const getTravelSpots = async () => {
  const response = await axios.get(`${endpoint}/discover`);

  return response.data;
};

const getDetailTravelSpot = async (travelSpotId) => {
  const response = await axios.get(`${endpoint}/discover/${travelSpotId}`);

  return response.data;
};

const authService = { getTravelSpots, getDetailTravelSpot };

export default authService;
