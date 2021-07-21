import { getProductByID, updateProduct } from '@/services/product';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { Card, Empty, Spin } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import ProductForm from './components/ProductForm';
// import ProductForm from './ProductForm';

const UpdateProductPage = () => {
  const { productId } = useParams();

  const { data, loading } = useRequest(() => getProductByID(productId));

  if ((!data || data.length === 0) && !loading) {
    return <Empty />;
  }

  if (loading) return <Spin />;

  const handleUpdate = (values) => {
    const updateData = { ...values };

    updateData.tags = values.tags && values.tags.join(',');
    console.log(`data`, updateData);
    return updateProduct(productId, updateData);
  };

  const type = data?.generalProductId == null ? 'master' : 'child';
  console.log(`data`, data);
  return (
    <PageContainer>
      <Card>
        <Spin spinning={loading}>
          <ProForm
            initialValues={{
              ...data,
              tags: data.tags && data.tags.split(','),
            }}
            onFinish={handleUpdate}
          >
            <ProFormText name="id" hidden />
            <ProductForm type={type} />
          </ProForm>
        </Spin>
      </Card>
    </PageContainer>
  );
};

export default UpdateProductPage;
