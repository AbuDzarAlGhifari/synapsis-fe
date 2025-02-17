import { Post } from '@/types/post';

import React from 'react';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
  onCardClick: (post: Post) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post) => (
        <div key={post.id}>
          <PostCard post={post} onClick={() => onCardClick(post)} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
