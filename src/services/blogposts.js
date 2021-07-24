import request from '@/utils/requestServer';

export const updateBlogPostById = (blogPostId, updateBlogPost) => {
  return request.put(`/blogposts/${blogPostId}`, {
    data: {
      id: parseInt(blogPostId, 10),
      ...updateBlogPost,
    },
  });
};

export const getAllBlogPost = () => {
  return request.get(`/blogposts`);
};

export const createBlogPost = (newBlogPost) => {
  return request.post(`/blogposts`, {
    data: {
      active: true,
      ...newBlogPost,
    },
  });
};

export const getBlogPostById = (blogPostId) => {
  return request.get(`/blogposts/${blogPostId}`);
};

export const deleteBlogPostId = (blogPostId) => {
  return request.delete(`/blogposts/${blogPostId}`);
};
