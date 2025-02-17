import CommentModal from '@/components/CommentModal';
import FilterBar from '@/components/FilterBar';
import PostList from '@/components/PostList';
import SearchBar from '@/components/SearchBar';

import { getPosts } from '@/services/postsApi';
import { getUsers } from '@/services/usersApi';
import { Post } from '@/types/post';

import { useQuery } from '@tanstack/react-query';
import { Pagination, Spin } from 'antd';
import { useState } from 'react';

const PublicHome = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [filterUserId, setFilterUserId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: postsData, isLoading: postsLoading } = useQuery({
    queryKey: ['posts', page, pageSize],
    queryFn: () => getPosts(page, pageSize),
  });

  const { data: usersData } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(1, 100),
  });

  const filteredPosts =
    postsData?.posts.filter((post) => {
      const matchesTitle = post.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesUser = filterUserId ? post.user_id === filterUserId : true;
      return matchesTitle && matchesUser;
    }) || [];

  if (postsLoading) return <Spin />;

  const userOptions =
    usersData?.users.map((user) => ({
      value: user.id,
      label: user.name,
    })) || [];

  const handleCardClick = (post: Post) => {
    setSelectedPost(post);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search posts"
        />
        <FilterBar
          value={filterUserId}
          onChange={setFilterUserId}
          options={userOptions}
          placeholder="Filter by user"
        />
      </div>

      <PostList posts={filteredPosts} onCardClick={handleCardClick} />

      <Pagination
        current={page}
        pageSize={pageSize}
        total={postsData?.total || 0}
        onChange={(newPage, newPageSize) => {
          setPage(newPage);
          setPageSize(newPageSize);
        }}
        className="mt-4 justify-center sm:justify-end"
      />

      {selectedPost && (
        <CommentModal
          visible={!!selectedPost}
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

export default PublicHome;
