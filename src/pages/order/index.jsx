import { getOrder, updateOrderstatus } from '@/services/order';
import { deleteProduct } from '@/services/product';
import { PAYMENT_TYPE } from '@/utils/constraints';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Card, Space, Modal, Typography, Drawer } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import { FormattedMessage } from 'umi';
import OrderDetail from './order-detail';

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
  const [currentOrder, setCurrentOrder] = React.useState(null);

  const handleCancel = () => {
    Modal.confirm({
      title: 'Hủy đơn hàng',
      content: 'Xác nhận hủy đơn hàng',
      onOk: () => {
        return updateOrderstatus(currentOrder.id, 2)
          .then(() => setCurrentOrder(null))
          .then(actionRef?.current.reload);
      },
    });
  };

  const handleComplete = () => {
    Modal.confirm({
      title: 'Xác nhận đơn hàng',
      content: 'Xác nhận đã thanh toán đơn hàng',
      onOk: () => {
        return updateOrderstatus(currentOrder.id, 1)
          .then(() => setCurrentOrder(null))
          .then(actionRef?.current.reload);
      },
    });
  };

  return (
    <PageContainer>
      <Drawer
        width={1000}
        title={`Thông tin đơn hàng ${currentOrder?.id}`}
        visible={!!currentOrder}
        onClose={() => setCurrentOrder(null)}
        destroyOnClose
        footerStyle={{
          textAlign: 'right',
        }}
        footer={
          <Space>
            <Button type="text" onClick={handleCancel} danger>
              Hủy đơn
            </Button>
            <Button type="primary" onClick={handleComplete}>
              Xác nhận đơn hàng
            </Button>
          </Space>
        }
      >
        <OrderDetail data={currentOrder} />
      </Drawer>
      <Card>
        <ProTable
          actionRef={actionRef}
          scroll={{
            x: 650,
          }}
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
                      <strong>{product.productName}</strong>
                    </Typography.Paragraph>
                  ))}
                </Space>
              ),
            },
            {
              title: 'Số lượng',
              width: 250,
              render: (_, { orderDetails }) => (
                <Space direction="vertical">
                  {orderDetails.map(({ product, quantity }) => (
                    <Typography.Paragraph key={product.id}>{quantity}</Typography.Paragraph>
                  ))}
                </Space>
              ),
            },
            {
              title: <FormattedMessage id="order.customerName" />,
              dataIndex: 'custName',
              search: false,
              width: 250,
              sorter: (a, b) => a.custName - b.custName,
            },
            {
              title: 'Email',
              dataIndex: 'custEmail',
              search: false,
              width: 250,
              sorter: (a, b) => a.custEmail - b.custEmail,
            },
            {
              title: <FormattedMessage id="order.phone" />,
              dataIndex: 'custPhone',
              width: 150,
              sorter: (a, b) => a.custPhone - b.custPhone,
            },
            {
              title: 'Ghi chú',
              dataIndex: 'note',
              valueType: 'textarea',
              width: 250,
            },
            {
              title: 'Ngày tạo',
              dataIndex: 'checkInDate',
              valueType: 'date',
              width: 170,
            },
            {
              title: <FormattedMessage id="order.status" />,
              dataIndex: 'status',
              search: false,
              width: 150,
              render: (_, { status }) => {
                return orderStatus.find(({ value }) => value == status)?.label ?? '-';
              },
              sorter: (a, b) => a.status - b.status,
            },

            {
              title: 'Hành động',
              fixed: 'right',
              align: 'center',
              width: 100,
              valueType: 'option',
              render: (_, prod) => (
                <Space>
                  <Button onClick={() => setCurrentOrder(prod)} danger type="primary">
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
