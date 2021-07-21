import request from '@/utils/requestServer';

export const getMasterProd = () =>
  request.get(`/products`, {
    params: {
      isParent: true,
    },
  });

  export const getChildProd = () =>
  request.get(`/products`, {
    params: {
      isParent: false,
    },
  });

export const createProductMaster = (data) => request.post('/products', { data });

export const deleteProduct = (prodId) => request.delete(`/products/${prodId}`);

export const getProductByID = (prodId) => request.get(`/products/${prodId}`);

export const updateProduct = (prodId, data) => request.put(`/products/${prodId}`, { data });
