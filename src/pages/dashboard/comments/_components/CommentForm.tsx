import axiosInstance from '@/lib/axiosInstance';
import { Comment } from '@/types/comment';
import { useQuery } from '@tanstack/react-query';
import { Form, Input, message, Modal, Select } from 'antd';
import React, { useEffect } from 'react';

interface Post {
  id: number;
  title: string;
}

const getPosts = async (): Promise<Post[]> => {
  const response = await axiosInstance.get<Post[]>('/posts');
  return response.data;
};

interface CommentFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  editingComment: Comment | null;
}

const CommentForm: React.FC<CommentFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  editingComment,
}) => {
  const [form] = Form.useForm();

  // Ambil daftar post menggunakan react-query
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  useEffect(() => {
    if (editingComment) {
      form.setFieldsValue({
        post_id: editingComment.post_id
          ? editingComment.post_id.toString()
          : '',
        name: editingComment.name || '',
        email: editingComment.email || '',
        body: editingComment.body || '',
      });
    } else {
      form.resetFields();
    }
  }, [editingComment, visible, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // Konversi post_id ke number sebelum submit
      values.post_id = Number(values.post_id);
      onSubmit(values);
    } catch (errorInfo) {
      message.error('Please fill in all fields correctly.');
    }
  };

  return (
    <Modal
      title={editingComment ? 'Edit Comment' : 'Create Comment'}
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      forceRender
      destroyOnClose
      getContainer={false}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ post_id: '', name: '', email: '', body: '' }}
      >
        <Form.Item
          label="POST"
          name="post_id"
          rules={[{ required: true, message: 'Please select a post!' }]}
        >
          <Select
            loading={postsLoading}
            placeholder="Select a post"
            showSearch
            options={
              posts
                ? posts.map((post) => ({
                    label: post.title,
                    value: post.id.toString(),
                  }))
                : []
            }
            filterOption={(input, option) =>
              (option?.label as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter a name!' }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter an email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Body"
          name="body"
          rules={[
            { required: true, message: 'Please enter the comment body!' },
          ]}
        >
          <Input.TextArea placeholder="Enter comment" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CommentForm;
