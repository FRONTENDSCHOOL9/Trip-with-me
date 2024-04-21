import { useEffect, useState } from 'react';
import usePageStore from '@zustand/pageName.mjs';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import ProductSellListItem from '@pages/mypage/ProductSellListItem';
import { BeatLoader } from 'react-spinners';

function ProductSellList() {
  const page = '판매 목록';
  const setPageName = usePageStore(state => state.setPageName);
  const axios = useCustomAxios();
  const [sellData, setSellData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSellProduct = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/seller/products');
      const list = response?.data?.item?.map(item => {
        console.log('item', item);
        return <ProductSellListItem key={item?._id} item={item} />;
      });
      setSellData(list);
      console.log('list', list);
      setIsLoading(false);
    } catch (error) {
      console.error('상품 정보 불러오기 실패', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPageName(page);
    getSellProduct();
  }, []);
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[780px]">
          <BeatLoader color="#68A9ED" />
        </div>
      ) : (
        <ul>{sellData}</ul>
      )}
    </div>
  );
}

export default ProductSellList;
