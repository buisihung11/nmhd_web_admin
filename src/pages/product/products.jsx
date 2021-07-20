import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Card, Image, Space } from 'antd';
import React from 'react';

const ProductChildListPage = () => {
  return (
    <PageContainer title="Danh sách sản phẩm">
      <Card>
        <ProTable
          columns={[
            {
              title: 'Hình ảnh',
              dataIndex: 'thumbnail',
              render: (thumbnail) => <Image w={250} src={thumbnail} />,
            },
            {
              title: 'Mã sản phẩm',
              dataIndex: 'sku',
            },
            {
              title: 'Tên sản phẩm',
              dataIndex: 'sku',
            },
            {
              title: 'Miêu tả',
              dataIndex: 'description',
              ellipsis: true,
            },
            {
              title: 'Hành động',
              fixed: 'right',
              align: 'center',
              valueType: 'option',
              render: (_, prod) => (
                <Space>
                  <Button danger>Xóa</Button>
                  <Button danger type="primary">
                    Cập nhật
                  </Button>
                </Space>
              ),
            },
          ]}
        />
      </Card>
    </PageContainer>
  );
};

export default ProductChildListPage;
