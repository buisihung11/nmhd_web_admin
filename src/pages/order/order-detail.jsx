import React from 'react';
import { convertDateToStr } from '@/utils/utils';
import Descriptions from '@ant-design/pro-descriptions';
import { Image, Tag, Typography, Card as ProCard } from 'antd';

import ProTable from '@ant-design/pro-table';

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

const OrderDetail = ({ data }) => {
  const { status, checkInDate, orderDetails = [], note, id } = data || {};

  const { custName, custEmail, custPhone } = data || {};

  console.log('data', data);

  return (
    <>
      <ProCard split="vertical">
        <Descriptions layout="horizontal" title="Thông tin khách hàng">
          <Descriptions.Item label="Tên khách hàng">{custName}</Descriptions.Item>
          <Descriptions.Item label="SDT">{custPhone}</Descriptions.Item>
          <Descriptions.Item label="Email">{custEmail}</Descriptions.Item>
        </Descriptions>
        <Descriptions title="Thông tin đơn hàng">
          <Descriptions.Item label="Mã đơn">
            <Typography.Text strong>{id}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Thời gian đặt">
            {convertDateToStr(checkInDate)}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            {orderStatus.find(({ value }) => value == status)?.label ?? '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Ghi chú" span={2}>
            <Typography.Paragraph>{note}</Typography.Paragraph>
          </Descriptions.Item>
        </Descriptions>
      </ProCard>

      <ProCard ghost layout="center">
        <ProTable
          headerTitle="Danh sách sản phẩm"
          dataSource={orderDetails}
          search={false}
          columns={[
            {
              title: 'Hình ảnh',
              dataIndex: ['product', 'thumbnail'],
              render: (thumbnail) => <Image width={80} height={80} src={thumbnail} />,
            },
            {
              title: 'Mã sản phẩm',
              dataIndex: ['product', 'sku'],
              valueType: 'text',
              sorter: (a, b) => a.sku > b.sku,
            },
            {
              title: 'Tên sản phẩm',
              dataIndex: 'productName',
              sorter: (a, b) => a.productName > b.productName,
            },
            {
              title: 'Sô lượng',
              width: 100,
              dataIndex: 'quantity',
            },
          ]}
          scroll={{
            y: 250,
          }}
        />
      </ProCard>
    </>
  );
};

export default OrderDetail;
