import request from '@/utils/requestServer';

export const getOrder = () => request.get('/orders');
