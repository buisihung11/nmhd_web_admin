import request from '@/utils/requestServer';

export const login = (data) => request.post(`/users/login`, { data });

export const changePassword = (data) => request.put(`/users`, { data });
