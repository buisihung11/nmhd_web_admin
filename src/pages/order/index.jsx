import { getOrder } from '@/services/order';
import { deleteProduct, getMasterProd } from '@/services/product';
import { PAYMENT_TYPE } from '@/utils/constraints';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Card, Image, Space, Tag, Modal, Typography } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import { FormattedMessage } from 'umi';
import { Link } from 'umi';

const { Text } = Typography;

export const orderStatus = [
  {
    label: <Text type="warning">Mới</Text>,
    value: 0,
  },
  {
    label: <Text type="success">Đã thanh toán</Text>,
    value: 1,
  },
  {
    label: <Text type="danger">Đã hủy</Text>,
    value: 2,
  },
];

export const getPaymentType = (type) => {
  return PAYMENT_TYPE.find(({ value }) => value === type)?.label ?? <span>{type}</span>;
};

const OrderListPage = () => {
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
          search={false}
          request={() =>
            getOrder().then((res) => ({
              data: res,
              success: true,
              total: res.length,
            }))
          }
          columns={[
            {
              title: <FormattedMessage id="order.invoice_id" />,
              dataIndex: 'id',
              search: false,
              width: 150,
              fixed: 'left',
            },
            {
              title: 'Sản phẩm',
              search: false,
              width: 250,
              render: (_, { orderDetails }) => (
                <Space direction="vertical">
                  {orderDetails.map(({ product, quantity }) => (
                    <Typography.Paragraph key={product.id}>
                      -<strong>{product.productName}</strong> / SL: {quantity}
                    </Typography.Paragraph>
                  ))}
                </Space>
              ),
            },
            {
              title: <FormattedMessage id="order.customerName" />,
              dataIndex: 'custName',
              search: false,
              width: 250,
            },
            {
              title: <FormattedMessage id="order.phone" />,
              dataIndex: 'custPhone',
              width: 150,
            },
            {
              title: 'Ghi chú',
              dataIndex: 'note',
              valueType: 'textarea',
              width: 150,
            },
            {
              title: 'Ngày tạo',
              dataIndex: 'checkInDate',
              valueType: 'date',
            },
            {
              title: <FormattedMessage id="order.status" />,
              dataIndex: 'status',
              search: false,
              width: 150,
              render: (_, { status }) => {
                return orderStatus.find(({ value }) => value == status)?.label ?? '-';
              },
            },

            {
              title: 'Hành động',
              fixed: 'right',
              align: 'center',
              valueType: 'option',
              render: (_, prod) => (
                <Space>
                  <Button onClick={() => history.push(`/product/${prod.id}`)} danger type="primary">
                    Chi tiết
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

export default OrderListPage;
