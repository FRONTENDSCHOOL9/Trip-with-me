import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useMemberState = create(
  persist(
    set => ({
      user: null,
      setUser: newUser => set({ user: newUser }),
    }),
    {
      name: 'memberState', // 이 이름으로 스토리지에 저장됩니다.
      storage: createJSONStorage(() => sessionStorage), // localStorage를 사용하여 상태를 저장합니다.
    },
  ),
);

export default useMemberState;
