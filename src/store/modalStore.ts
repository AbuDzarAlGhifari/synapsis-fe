import { User } from '@/types/user';
import { create } from 'zustand';

interface ModalState {
  isModalVisible: boolean;
  editingUser: User | null;
  openModal: (user?: User) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isModalVisible: false,
  editingUser: null,
  openModal: (user?: User) =>
    set({ isModalVisible: true, editingUser: user || null }),
  closeModal: () => set({ isModalVisible: false, editingUser: null }),
}));
