import { useEffect, useState } from 'react';
import usePageStore from '@zustand/pageName.mjs';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import ProductSellListItem from '@pages/mypage/ProductSellListItem';

function ProductSellList() {
  const page = '판매 목록';
  const setPageName = usePageStore(state => state.setPageName);
  const axios = useCustomAxios();
  const [sellData, setSellData] = useState([]);
  const getSellProduct = async () => {
    try {
      const response = await axios.get('/seller/products');
      const list = response?.data?.item?.map(item => {
        console.log('item', item);
        return <ProductSellListItem key={item?._id} item={item} />;
      });
      setSellData(list);
      console.log('list', list);
    } catch (error) {
      console.error('상품 정보 불러오기 실패', error);
    }
  };

  useEffect(() => {
    setPageName(page);
    getSellProduct();
  }, []);
  return (
    <div>
      <ul>
        <li>{sellData}</li>
      </ul>
    </div>
  );
}

export default ProductSellList;
