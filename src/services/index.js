import axios from '../api/todo';

export const getTodos = async () => {
  const res = await axios.get('/todo');
  return res.data;
};
export const createTodo = async (payload) => {
  return await axios.post('/todo', payload);
};

