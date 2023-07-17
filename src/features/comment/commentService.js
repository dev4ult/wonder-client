import axios from 'axios';

const endpoint = import.meta.env.VITE_BASEURL;

const commentAPost = async (comment, post_type, post_id, token_id) => {
  const response = await axios.put(
    `${endpoint}/${post_type}/${post_id}`,
    {
      comment_user: comment,
    },
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token_id}`,
      },
    }
  );

  return response.data.message;
};

const commentService = { commentAPost };

export default commentService;
