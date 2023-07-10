import axios from 'axios';

const endpoint = import.meta.env.VITE_BASEURL;

const getCommentsByPost = async (post_type, post_id) => {
  const response = await axios.get(`${endpoint}/${post_type}/${post_id}`, {
    headers: {
      'content-type': 'application/json',
    },
  });

  return response.data;
};

const commentService = { getCommentsByPost };

export default commentService;
