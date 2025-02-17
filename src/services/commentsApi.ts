import axiosInstance from '@/lib/axiosInstance';
import { Comment } from '@/types/comment';

interface FetchCommentsResponse {
  comments: Comment[];
  total: number;
}

export const getComments = async (
  page: number,
  pageSize: number
): Promise<FetchCommentsResponse> => {
  const response = await axiosInstance.get<Comment[]>('/comments', {
    params: { page, per_page: pageSize },
  });
  const total = parseInt(response.headers['x-pagination-total'] || '0', 10);
  return { comments: response.data, total };
};

export const createComment = async (
  data: Omit<Comment, 'id'>
): Promise<Comment> => {
  const response = await axiosInstance.post<Comment>('/comments', data);
  return response.data;
};

export const updateComment = async ({
  id,
  data,
}: {
  id: number;
  data: Partial<Comment>;
}): Promise<Comment> => {
  const response = await axiosInstance.put<Comment>(`/comments/${id}`, data);
  return response.data;
};

export const deleteComment = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/comments/${id}`);
};
