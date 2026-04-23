import api from './api';

export const createComplaint = (payload) => api.post('/complaints', payload).then((res) => res.data);
export const fetchUserComplaints = () => api.get('/complaints/user').then((res) => res.data);
export const fetchAllComplaints = () => api.get('/complaints').then((res) => res.data);
export const updateComplaint = (id, payload) => api.put(`/complaints/${id}`, payload).then((res) => res.data);
export const deleteComplaint = (id) => api.delete(`/complaints/${id}`).then((res) => res.data);
export const fetchStats = () => api.get('/complaints/stats').then((res) => res.data);
