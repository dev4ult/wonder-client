import axios from 'axios';

const endpoint = import.meta.env.VITE_BASEURL;

const getArticles = async () => {
  const response = await axios.get(`${endpoint}/articles`);

  return response.data;
};

const getArticlesFromUser = async (user_id, token_id) => {
  const response = await axios.get(`${endpoint}/articles/${user_id}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token_id}`,
    },
  });

  return response.data;
};

const articleService = { getArticles, getArticlesFromUser };

export default articleService;
