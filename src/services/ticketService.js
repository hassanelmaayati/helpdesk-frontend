import api from './api';
export const getCategories = () => api.get('/categories');
export const createTicket = (data) => api.post('/tickets', data);
export const getTicket = (id) => api.get(`/tickets/${id}`);
export const updateTicket = (id, data) => api.put(`/tickets/${id}`, data);
export const deleteTicket = (id) => api.delete(`/tickets/${id}`);
export const updateTicketStatus = (id, status) =>
  api.put(`/tickets/${id}/status`, { status });