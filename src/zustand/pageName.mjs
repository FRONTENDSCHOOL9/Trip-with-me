import {create} from 'zustand';

const usePageStore = create((set)=> ({
  pageName: 'home',
  setPageName: (newPageName) => set({ pageName: newPageName }),
}));

export default usePageStore;