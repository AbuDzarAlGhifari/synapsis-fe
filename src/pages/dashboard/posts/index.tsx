import PostForm from '@/pages/dashboard/posts/_component/PostForm';
import PostsTable from '@/pages/dashboard/posts/_component/PostsTable';

import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from '@/services/postsApi';
import { Post } from '@/types/post';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, message } from 'antd';
import { useState } from 'react';

const DashboardPosts = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['posts', currentPage, pageSize],
    queryFn: () => getPosts(currentPage, pageSize),
  });

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      message.success('Post created successfully');
      setIsModalVisible(false);
    },
    onError: () => message.error('Error creating post'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Post> }) =>
      updatePost({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      message.success('Post updated successfully');
      setIsModalVisible(false);
      setEditingPost(null);
    },
    onError: () => message.error('Error updating post'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      message.success('Post deleted successfully');
    },
    onError: () => message.error('Error deleting post'),
  });

  const handleCreate = () => {
    setEditingPost(null);
    setIsModalVisible(true);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsModalVisible(true);
  };

  const handleDelete = (postId: number) => {
    Modal.confirm({
      title: 'Are you sure delete this post?',
      onOk: () => {
        deleteMutation.mutate(postId);
      },
    });
  };

  const handleFormSubmit = (values: any) => {
    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg sm:text-2xl font-bold">Dashboard - Posts</h1>
        <Button type="primary" onClick={handleCreate} className="font-semibold">
          + Add Post
        </Button>
      </div>
      <PostsTable
        data={data?.posts || []}
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
      <PostForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleFormSubmit}
        editingPost={editingPost}
      />
    </div>
  );
};

export default DashboardPosts;
