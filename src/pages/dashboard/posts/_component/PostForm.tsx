import { getUsers } from '@/services/usersApi';
import { Post } from '@/types/post';
import { User } from '@/types/user';

import { useQuery } from '@tanstack/react-query';
import { Button, Input, Modal, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

interface PostFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  editingPost: Post | null;
}

const PostForm: React.FC<PostFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  editingPost,
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const {
    data: usersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(1, 100),
  });

  useEffect(() => {
    if (editingPost) {
      setUserId(editingPost.user_id?.toString() || null);
      setTitle(editingPost.title || '');
      setBody(editingPost.body || '');
    } else {
      setUserId(null);
      setTitle('');
      setBody('');
    }
  }, [editingPost, visible]);

  const handleSubmit = () => {
    if (!userId || !title || !body) {
      return alert('Please fill in all fields');
    }
    onSubmit({ user_id: Number(userId), title, body });
  };

  return (
    <Modal
      title={editingPost ? 'Edit Post' : 'Create Post'}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {editingPost ? 'Update' : 'Create'}
        </Button>,
      ]}
      destroyOnClose
    >
      <div className="flex flex-col gap-4">
        <label>
          <span className="block mb-1">User ID</span>
          {isLoading ? (
            <Spin />
          ) : error ? (
            <p className="text-red-500">Failed to load users</p>
          ) : (
            <Select
              value={userId}
              onChange={(value) => setUserId(value)}
              placeholder="Select User ID"
              className="w-full"
            >
              {usersData?.users.map((user: User) => (
                <Select.Option key={user.id} value={user.id.toString()}>
                  {user.name} (ID: {user.id})
                </Select.Option>
              ))}
            </Select>
          )}
        </label>
        <label>
          <span className="block mb-1">Title</span>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          <span className="block mb-1">Body</span>
          <Input.TextArea
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
      </div>
    </Modal>
  );
};

export default PostForm;
