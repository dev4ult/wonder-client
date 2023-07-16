import axios from 'axios';

const endpoint = import.meta.env.VITE_BASEURL;

const getAllAssesments = async (token_id) => {
  const response = await axios.get(`${endpoint}/assesment`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token_id}`,
    },
  });

  return response.data;
};

const getAssesmentDetail = async (travelspot_id, token_id) => {
  const response = await axios.get(`${endpoint}/assesment/${travelspot_id}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token_id}`,
    },
  });

  return response.data;
};

const addAssesment = async (assesment_detail, travelspot_id, token_id) => {
  const { attractiveness: daya_tarik, cost: biaya, cleanliness: kebersihan, facilities: sarana_dan_prasarana } = assesment_detail;

  const data = {
    daya_tarik,
    biaya,
    kebersihan,
    sarana_dan_prasarana,
    id_objek_wisata: travelspot_id,
  };

  const response = await axios.post(`${endpoint}/assesment`, data, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token_id}`,
    },
  });

  return response.data.message;
};

const deleteAssesment = async (travelspot_id, token_id) => {
  const response = await axios.delete(`${endpoint}/assesment/${travelspot_id}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token_id}`,
    },
  });

  return response.data.message;
};

const updateAssesment = async (assesment_detail, travelspot_id, token_id) => {
  const { attractiveness: daya_tarik, cost: biaya, cleanliness: kebersihan, facilities: sarpras } = assesment_detail;

  const response = await axios.put(
    `${endpoint}/assesment/${travelspot_id}`,
    { daya_tarik, biaya, kebersihan, sarpras },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token_id}`,
      },
    }
  );

  return response.data.message;
};

const assesmentService = { getAllAssesments, getAssesmentDetail, addAssesment, updateAssesment, deleteAssesment };

export default assesmentService;
