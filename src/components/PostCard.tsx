import { Post } from '@/types/post';
import { Card } from 'antd';
import React from 'react';

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <Card
      title={
        <span className="text-lg font-semibold text-gray-800">
          {post.title}
        </span>
      }
      hoverable
      onClick={onClick}
      className="mx-2 my-4 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 cursor-pointer"
    >
      <p className="text-gray-600 leading-relaxed h-28 overflow-hidden text-ellipsis">
        {post.body}
      </p>
    </Card>
  );
};

export default PostCard;
