import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, Space, message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
import Footer from '@/components/Footer';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import styles from './index.less';
import { login } from '@/services/user';
import { setAppToken, setUserInfo } from '@/utils/utils';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = ({ history }) => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState({});
  const [type, setType] = useState('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);

    try {
      // 登录
      const msg = await login({ ...values });
      if (msg) {
        setAppToken(msg.access_token);
        setUserInfo({ ...msg.storeConfig, name: 'Admin', role: 'admin' });
        const defaultloginSuccessMessage = 'Đăng nhập thành công';
        message.success(defaultloginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */

        if (!history) return;
        const { query } = history.location;
        const { redirect } = query;
        history.push(redirect || '/');
        return;
      } // 如果失败去设置用户错误信息

      setUserLoginState(msg);
    } catch (error) {
      const defaultloginFailureMessage = 'Sai thông tin đăng nhập.';
      message.error(defaultloginFailureMessage);
    }

    setSubmitting(false);
  };

  if (initialState.currentUser) {
    history.push('/');
  }

  const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg" />
              <span className={styles.title}>Nước mắm Hồng Đức</span>
            </Link>
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            autoComplete="off"
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: 'Đăng nhập',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              handleSubmit(values);
            }}
          >
            {status === 'error' && loginType === 'account' && (
              <LoginMessage content="Sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại" />
            )}
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder="Tên đăng nhập"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên đăng nhập",
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder=""
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu",
                  },
                ]}
              />
            </>
          </ProForm>
        </div>
      </div>
    </div>
  );
};

export default Login;
