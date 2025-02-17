import UserForm from '@/pages/dashboard/user/_components/UserForm';
import UserTable from '@/pages/dashboard/user/_components/UserTable';

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from '@/services/usersApi';
import { useModalStore } from '@/store/modalStore';
import { User } from '@/types/user';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, message } from 'antd';
import { useState } from 'react';

const DashboardUser = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { isModalVisible, editingUser, openModal, closeModal } =
    useModalStore();

  const { data, isLoading } = useQuery({
    queryKey: ['users', currentPage, pageSize],
    queryFn: () => getUsers(currentPage, pageSize),
  });

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      message.success('User created successfully');
      closeModal();
    },
    onError: () => message.error('Error creating user'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<User> }) =>
      updateUser({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      message.success('User updated successfully');
      closeModal();
    },
    onError: () => message.error('Error updating user'),
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      message.success('User deleted successfully');
    },
    onError: () => message.error('Error deleting user'),
  });

  const handleCreate = () => {
    openModal();
  };

  const handleEdit = (user: User) => {
    openModal(user);
  };

  const handleDelete = (userId: number) => {
    Modal.confirm({
      title: 'Are you sure delete this user?',
      onOk: () => {
        deleteMutation.mutate(userId);
      },
    });
  };

  const handleFormSubmit = (values: any) => {
    if (editingUser) {
      updateMutation.mutate({ id: editingUser.id, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg sm:text-2xl font-bold">Dashboard - Users</h1>
        <Button type="primary" onClick={handleCreate} className="font-semibold">
          + Add User
        </Button>
      </div>
      <UserTable
        data={data?.users || []}
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
      <UserForm
        visible={isModalVisible}
        onCancel={closeModal}
        onSubmit={handleFormSubmit}
        editingUser={editingUser}
      />
    </div>
  );
};

export default DashboardUser;
