import request from '@/utils/requestServer';

export const getOrder = () => request.get('/orders');

export const updateOrderstatus = (orderId, status) =>
  request.put(`/orders/${orderId}/status`, {
    data: status,
  });
