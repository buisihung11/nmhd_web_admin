import { changePassword } from '@/services/user';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, notification } from 'antd';
import React from 'react';

const ChangePassword = () => {
  const handleChangePassword = (values) =>
    changePassword(values).catch((e) =>
      notification.error({
        message: 'Sai thông tin',
      }),
    );

  return (
    <PageContainer title="Thay đổi mật khẩu">
      <Card>
        <ProForm onFinish={handleChangePassword}>
          <ProFormText
            label="Tên đăng nhập"
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            placeholder="Tên đăng nhập"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên đăng nhập',
              },
            ]}
          />
          <ProFormText.Password
            label="Mật khẩu hiện tại"
            name="oldPassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder=""
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu',
              },
            ]}
          />
          <ProFormText.Password
            label="Mật khẩu mới"
            name="newPassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu',
              },
            ]}
          />
          <ProFormText.Password
            label="Xác nhận mật khẩu mới"
            name="confirmNew"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder=""
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không giống nhau'));
                },
              }),
            ]}
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default ChangePassword;
