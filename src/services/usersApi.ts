import axiosInstance from '@/lib/axiosInstance';
import { User } from '@/types/user';

interface FetchUsersResponse {
  users: User[];
  total: number;
}

export const getUsers = async (
  page: number,
  pageSize: number
): Promise<FetchUsersResponse> => {
  const response = await axiosInstance.get<User[]>('/users', {
    params: { page, per_page: pageSize },
  });
  const total = parseInt(response.headers['x-pagination-total'] || '0', 10);
  return { users: response.data, total };
};

export const createUser = async (data: Omit<User, 'id'>): Promise<User> => {
  const response = await axiosInstance.post<User>('/users', data);
  return response.data;
};

export const updateUser = async ({
  id,
  data,
}: {
  id: number;
  data: Partial<User>;
}): Promise<User> => {
  const response = await axiosInstance.put<User>(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`);
};
