import axios from 'axios';

const endpoint = import.meta.env.VITE_BASEURL;

const getAllCriterias = async (token_id) => {
  const response = await axios.get(`${endpoint}/criteria`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token_id}`,
    },
  });

  return response.data;
};

const getCriteriaDetail = async (criteria_id, token_id) => {
  const response = await axios.get(`${endpoint}/criteria/${criteria_id}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Beaerer ${token_id}`,
    },
  });

  return response.data;
};

const updateCriteria = async (criteria_detail, criteria_id, token_id) => {
  const { name: nama_kriteria, type: tipe, value: bobot } = criteria_detail;

  const response = await axios.put(
    `${endpoint}/criteria/${criteria_id}`,
    { nama_kriteria, tipe, bobot },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Beaerer ${token_id}`,
      },
    }
  );

  return response.data.message;
};

const criteriaService = { getAllCriterias, getCriteriaDetail, updateCriteria };

export default criteriaService;
