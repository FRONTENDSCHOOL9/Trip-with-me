import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const persistConfig = {
  name: 'memberState', // 이 이름으로 스토리지에 저장됩니다.
  Storage: () => sessionStorage, // localStorage를 사용하여 상태를 저장합니다.
};

const useMemberState = create(
  persist(
    set => ({
      user: null,
      setUser: newUser => set({ user: newUser }),
    }),
    persistConfig,
  ),
);

export default useMemberState;
