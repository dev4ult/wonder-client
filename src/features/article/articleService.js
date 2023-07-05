import axios from 'axios';

const endpoint = import.meta.env.VITE_BASEURL;

const getArticles = async () => {
  const response = await axios.get(`${endpoint}/articles`);

  return response.data;
};

const articleService = { getArticles };

export default articleService;
