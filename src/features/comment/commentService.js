import axios from 'axios';

const endpoint = import.meta.env.VITE_BASEURL;

const getCommentsByPost = async (post_type, post_id) => {
  const response = await axios.get(`${endpoint}/${post_type}/${post_id}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  return response.data;
};

const postACommentFromUser = async (user_id, comment, post_type, post_id, token_id) => {
  const response = await axios.post(
    `${endpoint}/${post_type}/${post_id}`,
    {
      id_user: user_id,
      komentar: comment,
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

const commentService = { getCommentsByPost, postACommentFromUser };

export default commentService;
