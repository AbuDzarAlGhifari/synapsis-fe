import { Post } from '@/types/post';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

interface PostsTableProps {
  data: Post[];
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
  loading: boolean;
}

const PostsTable: React.FC<PostsTableProps> = ({
  data,
  total,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
  loading,
}) => {
  const columns: ColumnsType<Post> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      fixed: 'left',
    },
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
      width: 100,
      responsive: ['md'],
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
      width: 300,
      responsive: ['md'],
      render: (text) => (
        <Tooltip title={text}>
          <div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: 250,
            }}
          >
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit Post">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Post">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        pageSizeOptions: ['10', '20', '50', '100'],
        showSizeChanger: true,
        total: total,
        onChange: (page, size) => {
          onPageChange(page);
        },
        onShowSizeChange: (current, newSize) => {
          onPageSizeChange(newSize);
        },
      }}
      loading={loading}
      scroll={{ x: 'max-content' }}
    />
  );
};

export default PostsTable;
