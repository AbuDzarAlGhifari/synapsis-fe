import axiosInstance from '@/lib/axiosInstance';
import { Comment } from '@/types/comment';

export const fetchCommentsForPost = async (
  postId: number
): Promise<Comment[]> => {
  const { data } = await axiosInstance.get<Comment[]>('/comments', {
    params: { post_id: postId },
  });
  return data;
};

export const addComment = async (
  commentData: Omit<Comment, 'id'>
): Promise<Comment> => {
  const { data } = await axiosInstance.post<Comment>('/comments', commentData);
  return data;
};
