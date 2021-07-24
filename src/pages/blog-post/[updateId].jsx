import ResoEditor from '@/components/ResoEditor/ResoEditor';
import { getBlogPostById, updateBlogPostById } from '@/services/blogposts';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import Upload from '@/components/Upload';
import { Affix, Alert, Card, Col, Form, Input, Row, Spin, Switch, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'umi';
import ProForm, { ProFormSelect } from '@ant-design/pro-form';
import { BLOGPOST_TYPE } from '@/utils/constraints';

const FormItem = Form.Item;

const UpdateArticle = (props) => {
  const [form] = Form.useForm();
  const {
    match: {
      params: { updateId },
    },
  } = props;

  const [updateError, setError] = useState(null);

  const history = useHistory();

  const { data, error, loading } = useRequest(() => getBlogPostById(updateId), {
    formatResult: (res) => {
      return res;
    },
  });

  useEffect(() => {
    if (data !== undefined) {
      form.setFieldsValue({ ...data, image: [{ response: data.image_url }] });
    }
  }, [data, form]);

  if (loading) return <Spin />;

  const onUpdateArticle = (blogpost) =>
    updateBlogPostById(updateId, blogpost)
      .then(() => {
        history.replace('/blog-post/index');
      })
      .catch((err) => {
        setError(err);
      });

  return (
    <PageContainer>
      {updateError && <Alert message={updateError} type="warning" closable />}
      <Card bordered={false}>
        <ProForm
          layout="vertical"
          onFinish={onUpdateArticle}
          name="create-article-form"
          form={form}
          scrollToFirstError
        >
          <Row justify="space-between">
            <Typography.Title level={3}>Thông tin bài viết</Typography.Title>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem name="banner" label="Ảnh đại điện">
                <Upload />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <FormItem
                label="Tên bài viết"
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên',
                  },
                ]}
              >
                <Input placeholder="Tiêu đề bài viết" />
              </FormItem>
            </Col>
            <Col xs={24} md={12}>
              <ProFormSelect
                options={BLOGPOST_TYPE}
                name="blogPostType"
                label="Loại bài viết"
                width="md"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label="Nội dung bài viết" name="content">
                <ResoEditor />
              </FormItem>
            </Col>
          </Row>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default UpdateArticle;
