import { create } from 'zustand';

interface SelectedUserState {
  selectedUserId: number | null;
  setSelectedUserId: (id: number | null) => void;
}

export const useSelectedUserStore = create<SelectedUserState>((set) => ({
  selectedUserId: null,
  setSelectedUserId: (id) => set({ selectedUserId: id }),
}));
