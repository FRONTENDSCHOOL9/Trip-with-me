import { create } from 'zustand';

export const useProductInfostore = create(set => ({
  productInfo: {
    price: 0,
    quantity: 0,
    buyQuantity: 0,
    show: true,
    active: true,
    name: '',
    mainImages: [],
    content: '',
    extra: '',
    selectSpot: [],
  },
  setProductInfo: newProductInfo =>
    set(state => ({
      productInfo: { ...state.productInfo, ...newProductInfo },
    })),
}));
