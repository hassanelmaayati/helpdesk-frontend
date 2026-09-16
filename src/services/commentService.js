import api from './api';

const createComment = async (ticketId, content) => {
  const response = await api.post(
    `/tickets/${ticketId}/comments`,
    { content }
  );
  return response.data;
};

const getComments = async (ticketId) => {
  const response = await api.get(`/tickets/${ticketId}/comments`);
  return response.data;
};

const updateComment = async (ticketId, commentId, content) => {
  const response = await api.put(
    `/tickets/${ticketId}/comments/${commentId}`,
    { content }
  );
  return response.data;
};

const deleteComment = async (ticketId, commentId) => {
  const response = await api.delete(
    `/tickets/${ticketId}/comments/${commentId}`
  );
  return response.data;
};

export {
  createComment,
  getComments,
  updateComment,
  deleteComment,
};
