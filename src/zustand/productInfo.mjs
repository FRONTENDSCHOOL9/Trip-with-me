import { create } from 'zustand';

export const useProductInfostore = create(set => ({
  productInfo: {
    price: 0,
    quantity: 0,
    show: true,
    active: true,
    name: '',
    mainImages: [],
    content: '',
    extra: {
      date: [],
      spot: [],
      themes: [],
      itineraryMaps: [],
    },
  },
  setProductInfo: newProductInfo =>
    set(state => ({
      productInfo: { ...state.productInfo, ...newProductInfo },
    })),
}));
