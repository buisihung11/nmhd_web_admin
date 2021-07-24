import { deleteBlogPostId, getAllBlogPost, updateBlogPostById } from '@/services/blogposts';
import { BLOGPOST_TYPE } from '@/utils/constraints';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Space, Switch, Tag, Modal, Drawer } from 'antd';
import React, { useRef, useState } from 'react';
import { FormattedMessage } from 'umi';
import { blogPostColumns } from './config';

const BlogPostPage = ({ history }) => {
  const actionRef = React.useRef();
  const handleDelete = (blogPostId) => {
    Modal.confirm({
      title: 'Xóa sản phẩm',
      content: 'Xác nhận xóa sản phẩm',
      onOk: () => {
        return deleteBlogPostId(blogPostId).then(actionRef?.current?.reload);
      },
    });
  };

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        search={false}
        toolBarRender={() => [
          <Button
            onClick={() => history.push('/product/create?type=master')}
            key="add-product-master"
            type="primary"
            icon={<PlusOutlined />}
          >
            Tạo dòng sản phẩm
          </Button>,
        ]}
        request={() =>
          getAllBlogPost().then((res) => ({
            data: res,
            success: true,
            total: res.length,
          }))
        }
        columns={[
          ...blogPostColumns,
          {
            title: 'Loại bài viết',
            dataIndex: 'blogPostType',
            valueType: 'select',
            sorter: (a, b) => a.blogPostType - b.blogPostType,
            render: (_, { blogPostType: type }) => (
              <Tag>{BLOGPOST_TYPE.find(({ value }) => value === type)?.label}</Tag>
            ),
          },
          {
            title: 'Hành động',
            fixed: 'right',
            align: 'center',
            valueType: 'option',
            render: (_, blogPost) => (
              <Space>
                <Button onClick={() => handleDelete(blogPost.id)} danger>
                  Xóa
                </Button>
                <Button
                  onClick={() => history.push(`/blog-post/${blogPost.id}`)}
                  danger
                  type="primary"
                >
                  Cập nhật
                </Button>
              </Space>
            ),
          },
        ]}
      />
    </PageContainer>
  );
};

export default BlogPostPage;
