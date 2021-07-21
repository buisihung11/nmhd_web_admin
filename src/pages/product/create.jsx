import { createProductMaster } from '@/services/product';
import { stringToSlug } from '@/utils/utils';
import { InboxOutlined } from '@ant-design/icons';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import React from 'react';
import ProductForm from './components/ProductForm';

const CreateProductPage = ({ history }) => {
  const handleSubmit = (values) => {
    const data = { ...values };
    data.sku = stringToSlug(data.sku);
    data.tags = values.tags && values.tags.join(',');
    return createProductMaster(data);
  };

  const {
    location: {
      query: { type = 'master' },
    },
  } = history;

  return (
    <PageContainer title="Tạo dòng sản phẩm">
      <Card>
        <ProForm onFinish={handleSubmit}>
          <ProductForm type={type} />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default CreateProductPage;
