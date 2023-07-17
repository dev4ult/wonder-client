import axios from 'axios';

const endpoint = import.meta.env.VITE_BASEURL;

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

const commentService = { postACommentFromUser };

export default commentService;
