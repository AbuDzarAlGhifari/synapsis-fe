import { Comment } from '@/types/comment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

interface CommentsTableProps {
  data: Comment[];
  total: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onEdit: (comment: Comment) => void;
  onDelete: (commentId: number) => void;
  loading: boolean;
}

const CommentsTable: React.FC<CommentsTableProps> = ({
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
  const columns: ColumnsType<Comment> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      responsive: ['xs', 'sm'],
    },
    {
      title: 'Post ID',
      dataIndex: 'post_id',
      key: 'post_id',
      responsive: ['xs', 'sm'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      responsive: ['sm'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      responsive: ['sm'],
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
      responsive: ['sm'],
      render: (text) => (
        <Tooltip title={text}>
          <div
            style={{
              maxWidth: '200px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
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
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record.id)}
              size="small"
              danger
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

export default CommentsTable;
