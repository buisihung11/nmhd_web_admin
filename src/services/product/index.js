import request from '@/utils/requestServer';

export const getMasterProd = () =>
  request.get(`/products`, {
    params: {
      isParent: true,
    },
  });

export const createProductMaster = (data) => request.post('/products', { data });

export const deleteProduct = (prodId) => request.delete(`/products/${prodId}`);
