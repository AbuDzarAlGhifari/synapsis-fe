import axiosInstance from '@/lib/axiosInstance';
import { Post } from '@/types/post';

interface FetchPostsResponse {
  posts: Post[];
  total: number;
}

export const getPosts = async (
  page: number,
  pageSize: number
): Promise<FetchPostsResponse> => {
  const response = await axiosInstance.get<Post[]>('/posts', {
    params: { page, per_page: pageSize },
  });
  const total = parseInt(response.headers['x-pagination-total'] || '0', 10);
  return { posts: response.data, total };
};

export const createPost = async (data: Omit<Post, 'id'>): Promise<Post> => {
  const response = await axiosInstance.post<Post>('/posts', data);
  return response.data;
};

export const updatePost = async ({
  id,
  data,
}: {
  id: number;
  data: Partial<Post>;
}): Promise<Post> => {
  const response = await axiosInstance.put<Post>(`/posts/${id}`, data);
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/posts/${id}`);
};
