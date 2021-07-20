import { deleteProduct, getMasterProd } from '@/services/product';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Card, Image, Space, Tag, Modal } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';

const ProductMasterListPage = () => {
  const history = useHistory();
  const actionRef = React.useRef();

  const handleDelete = (prodId) => {
    Modal.confirm({
      title: 'Xóa sản phẩm',
      content: 'Xác nhận xóa sản phẩm',
      onOk: () => {
        return deleteProduct(prodId).then(actionRef?.current?.reload);
      },
    });
  };

  return (
    <PageContainer>
      <Card>
        <ProTable
          actionRef={actionRef}
          toolBarRender={() => [
            <Button
              onClick={() => history.push('/product/create?type=master')}
              key="add-product-master"
              type="primary"
            >
              Tạo dòng sản phẩm
            </Button>,
          ]}
          request={() =>
            getMasterProd().then((res) => ({
              data: res,
              success: true,
              total: res.length,
            }))
          }
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
              title: 'Thẻ',
              dataIndex: 'tags',
              render: (tags) => tags && tags?.split(',')?.map((tag) => <Tag key={tag}>{tag}</Tag>),
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
                  <Button onClick={() => handleDelete(prod.id)} danger>
                    Xóa
                  </Button>
                  <Button onClick={() => history.push(`/product/${prod.id}`)} danger type="primary">
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

export default ProductMasterListPage;
