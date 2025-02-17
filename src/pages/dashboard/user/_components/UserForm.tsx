import { User } from '@/types/user';
import { Modal, Input, Select, Button } from 'antd';
import React, { useEffect, useState } from 'react';

interface UserFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  editingUser: User | null;
}

const UserForm: React.FC<UserFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  editingUser,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name || '');
      setEmail(editingUser.email || '');
      setGender(editingUser.gender || '');
      setStatus(editingUser.status || '');
    } else {
      setName('');
      setEmail('');
      setGender('');
      setStatus('');
    }
  }, [editingUser, visible]);

  const handleSubmit = () => {
    if (!name || !email || !gender || !status) {
      return alert('Please fill in all fields');
    }
    onSubmit({ name, email, gender, status });
  };

  return (
    <Modal
      title={editingUser ? 'Edit User' : 'Create User'}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {editingUser ? 'Update' : 'Create'}
        </Button>,
      ]}
      destroyOnClose
    >
      <div className="flex flex-col gap-4">
        <label>
          <span className="block mb-1">Name</span>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          <span className="block mb-1">Email</span>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span className="block mb-1">Gender</span>
          <Select value={gender} onChange={setGender} className="w-full">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </label>
        <label>
          <span className="block mb-1">Status</span>
          <Select value={status} onChange={setStatus} className="w-full">
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </label>
      </div>
    </Modal>
  );
};

export default UserForm;
