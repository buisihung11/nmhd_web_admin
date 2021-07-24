import React from 'react';
import { FormattedMessage } from 'umi';
import { Image } from 'antd';

export const blogPostColumns = [
  {
    title: <FormattedMessage id="menu.blog-post.thumbnail" />,
    dataIndex: 'title',
    formItemProps: {
      placeholder: 'Vui lòng nhập tiêu đề bài viết',
    },
    search: false,
    fixed: 'left',
    width: 175,
    render: (_, { banner }) => <Image width={150} src={banner} />,
  },
  {
    title: <FormattedMessage id="menu.blog-post.name" />,
    dataIndex: 'title',
    formItemProps: {
      placeholder: 'Vui lòng nhập tiêu đề bài viết',
    },
    fixed: 'left',
  },
];
