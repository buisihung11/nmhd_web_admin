import ResoEditor from '@/components/ResoEditor/ResoEditor';
import Upload from '@/components/Upload';
import { updateBlogPostById } from '@/services/blogposts';
import { BLOGPOST_TYPE } from '@/utils/constraints';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import React from 'react';

const CreateBlogPost = () => {
  return (
    <ProForm onFinish={(values) => CreateBlogPost(values)}>
      <ProForm.Item name="banner" label="Ảnh đại điện">
        <Upload />
      </ProForm.Item>
      <ProForm.Group>
        <ProFormText
          label="Tên bài viết"
          name="title"
          width="md"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên',
            },
          ]}
        />
        <ProFormSelect
          options={BLOGPOST_TYPE}
          name="blogPostType"
          label="Loại bài viết"
          width="md"
        />
      </ProForm.Group>

      <ProForm.Item label="Nội dung bài viết" name="content">
        <ResoEditor />
      </ProForm.Item>
    </ProForm>
  );
};

export default CreateBlogPost;
