import ProForm from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { Card, Empty, Spin } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import ProductForm from './components/ProductForm';
// import ProductForm from './ProductForm';

const UpdateProductPage = ({ history }) => {
  console.log(`history`, history);
  const { productId } = useParams();

  // const { data, loading } = useRequest();

  // if (!data || data.length === 0) {
  //   return <Empty />;
  // }

  return (
    <PageContainer>
      <Card>
        <Spin spinning={loading}>
          <ProForm onFinish={console.log}>
            <ProductForm />
          </ProForm>
        </Spin>
      </Card>
    </PageContainer>
  );
};

export default UpdateProductPage;
