import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from '@/services/commentsApi';
import { Comment } from '@/types/comment';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, message } from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import CommentsTable from './_components/CommentsTable';

const CommentForm = dynamic(() => import('./_components/CommentForm'), {
  ssr: false,
});

const DashboardComments = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['comments', currentPage, pageSize],
    queryFn: () => getComments(currentPage, pageSize),
  });

  const createMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      message.success('Comment created successfully');
      setIsModalVisible(false);
    },
    onError: () => message.error('Error creating comment'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Comment> }) =>
      updateComment({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      message.success('Comment updated successfully');
      setIsModalVisible(false);
      setEditingComment(null);
    },
    onError: () => message.error('Error updating comment'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      message.success('Comment deleted successfully');
    },
    onError: () => message.error('Error deleting comment'),
  });

  const handleCreate = () => {
    setEditingComment(null);
    setIsModalVisible(true);
  };

  const handleEdit = (comment: Comment) => {
    setEditingComment(comment);
    setIsModalVisible(true);
  };

  const handleDelete = (commentId: number) => {
    Modal.confirm({
      title: 'Are you sure delete this comment?',
      onOk: () => {
        deleteMutation.mutate(commentId);
      },
    });
  };

  const handleFormSubmit = (values: any) => {
    if (editingComment) {
      updateMutation.mutate({ id: editingComment.id, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg sm:text-2xl font-bold">Dashboard - Comments</h1>
        <Button type="primary" onClick={handleCreate} className="font-semibold">
          + Add Comment
        </Button>
      </div>
      <CommentsTable
        data={data?.comments || []}
        total={data?.total || 0}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={isLoading}
      />
      <CommentForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleFormSubmit}
        editingComment={editingComment}
      />
    </div>
  );
};

export default DashboardComments;
