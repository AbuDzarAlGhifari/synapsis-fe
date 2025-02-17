import { addComment, fetchCommentsForPost } from '@/services/publicApi';
import { getUsers } from '@/services/usersApi';
import { useSelectedUserStore } from '@/store/selectedUserStore';
import { Comment } from '@/types/comment';
import { Post } from '@/types/post';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input, List, Modal, Spin, message } from 'antd';
import { FC, useState } from 'react';

interface CommentModalProps {
  visible: boolean;
  post: Post | null;
  onClose: () => void;
}

const CommentModal: FC<CommentModalProps> = ({ visible, post, onClose }) => {
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState('');
  const { selectedUserId } = useSelectedUserStore();
  const { data: usersData } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(1, 100),
  });

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ['comments', post?.id],
    queryFn: () => (post ? fetchCommentsForPost(post.id) : []),
    enabled: !!post,
  });

  const commentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: (newComment) => {
      queryClient.setQueryData(
        ['comments', post?.id],
        (oldComments: Comment[] = []) => [newComment, ...oldComments]
      );
      message.success('Komentar berhasil ditambahkan!');
      setCommentText('');
    },
    onError: () => {
      message.error('Gagal menambahkan komentar. Coba lagi.');
    },
  });

  const handleSubmitComment = () => {
    if (!post || !selectedUserId || !commentText.trim()) {
      message.warning('Pilih user di Navbar dan isi komentar terlebih dahulu!');
      return;
    }

    const user = usersData?.users?.find((u) => u.id === selectedUserId);
    if (!user || !user.name || !user.email) {
      message.error('User tidak ditemukan atau data tidak lengkap!');
      return;
    }

    const newComment = {
      post_id: post.id,
      name: user.name,
      email: user.email,
      body: commentText,
    };

    commentMutation.mutate(newComment);
  };

  return (
    <Modal title={post?.title} open={visible} onCancel={onClose} footer={null}>
      {commentsLoading ? (
        <Spin />
      ) : (
        <>
          <Input.TextArea
            rows={3}
            placeholder="Tulis komentar..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button
            type="primary"
            onClick={handleSubmitComment}
            style={{ marginTop: '10px', width: '100%' }}
          >
            Kirim Komentar
          </Button>
          <List
            dataSource={comments}
            renderItem={(comment) => (
              <List.Item key={comment.id}>
                <List.Item.Meta
                  title={comment.name}
                  description={comment.body}
                />
              </List.Item>
            )}
          />
        </>
      )}
    </Modal>
  );
};

export default CommentModal;
