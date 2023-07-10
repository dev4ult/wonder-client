import axios from 'axios';

const endpoint = import.meta.env.VITE_BASEURL;

const likeAPost = async (user_id, post_type, post_id, token_id) => {
  const response = await axios.post(
    `${endpoint}/${post_type}/${post_id}/like`,
    {
      id_user: user_id,
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
