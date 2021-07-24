import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Spin } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';
import ProForm, { ProFormText, ProFormTimePicker } from '@ant-design/pro-form';
import { useRequest } from 'ahooks';
import { getStoreInfo, updateStoreInfo } from '@/services/store';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);
const a = {
  providerName1: 'string',
  providerName2: 'string',
  providerPhone1: 'string',
  providerPhone2: 'string',
  providerMail1: 'string',
  providerMail2: 'string',
  startTime: '2021-07-24T03:51:36.610Z',
  endTime: '2021-07-24T03:51:36.610Z',
  websiteURL: 'string',
};
export default () => {
  const formRef = React.useRef();
  const { data, loading } = useRequest(getStoreInfo);

  React.useEffect(() => {
    formRef.current?.setFieldsValue({ ...data });
  }, [data, formRef]);

  const updateStoreConfig = (values) => {
    return updateStoreInfo(values.id, values);
  };

  return (
    <PageContainer title="Thông tin cửa hàng">
      <Spin spinning={loading}>
        <Card>
          <ProForm
            formRef={formRef}
            onFinish={updateStoreConfig}
            initialValues={data}
            title="Thông tin cửa hàng"
            submitter={{
              searchConfig: {
                submitText: 'Cập nhật',
              },
            }}
          >
            <ProFormText name="id" label="ID" hidden />
            <ProForm.Group>
              <ProFormText name="websiteURL" label="Trang web" width="md" />
              <ProFormText name="address" label="Địa chỉ" width="md" />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText name="providerName1" label="Tên chủ cung cấp 1" width="md" />
              <ProFormText name="providerName2" label="Tên chủ cung cấp 2" width="md" />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText name="providerPhone1" label="SDT chủ cung cấp 1" width="md" />
              <ProFormText name="providerPhone2" label="SDT chủ cung cấp 2" width="md" />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText name="providerMail1" label="Mail chủ cung cấp 1" width="md" />
              <ProFormText name="providerMail2" label="Mail chủ cung cấp 2" width="md" />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormTimePicker name="startTime" label="Thời gian mở cửa" width="md" />
              <ProFormTimePicker name="endTime" label="Thời gian đóng cửa" width="md" />
            </ProForm.Group>
          </ProForm>
        </Card>
      </Spin>
    </PageContainer>
  );
};
