import axios from '../api/todo';

export const getTodos = async () => {
  const res = await axios.get('/todo');
  return res.data;
};

