import request from '@/utils/requestServer';

export const getStoreInfo = () => request.get(`/storeconfig`);

export const updateStoreInfo = (storeId, data) => request.put(`/storeconfig/${storeId}`, { data });
