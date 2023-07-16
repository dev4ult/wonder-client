import axios from 'axios';

const endpoint = import.meta.env.VITE_BASEURL;

const likeAPost = async (like, post_type, post_id, token_id) => {
  const response = await axios.post(
    `${endpoint}/${post_type}/${post_id}`,
    {
      like_user: like,
    },
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token_id}`,
      },
    }
  );

  return response.data;
};

const likeService = { likeAPost };

export default likeService;
