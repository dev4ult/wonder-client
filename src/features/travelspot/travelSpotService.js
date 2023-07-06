import axios from "axios";

const endpoint = import.meta.env.VITE_BASEURL;

const getTravelSpots = async () => {
  const response = await axios.get(`${endpoint}/discover`);

  return response.data;
};

const getTravelSpotDetail = async (travelSpotId) => {
  const response = await axios.get(`${endpoint}/discover/${travelSpotId}`);

  return response.data;
};

const travelSpotService = { getTravelSpots, getTravelSpotDetail };

export default travelSpotService;
