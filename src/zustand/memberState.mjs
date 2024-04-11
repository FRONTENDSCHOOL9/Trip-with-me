import { create } from 'zustand';

const persistState = (key, initialState) => {
  const storedState = sessionStorage.getItem(key); //getItem은 키에 해당하는 아이템을 가져온다.
  return storedState ? JSON.parse(storedState) : initialState;
};

const useMemberState = create(set => ({
  memberState: persistState('saveUser', null), //storedState값이 저장됨

  setMemberState: newValue => set({ memberState: newValue }),
}));

export default useMemberState;
