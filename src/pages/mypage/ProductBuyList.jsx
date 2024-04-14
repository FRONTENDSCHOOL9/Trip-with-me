import useCustomAxios from '@hooks/useCustomAxios.mjs';
import ProductBuyListItem from '@pages/mypage/ProductBuyListItem';
import usePageStore from '@zustand/pageName.mjs';
import { useEffect, useState } from 'react';

function ProductBuyList() {
  const page = '구매 목록';
  const setPageName = usePageStore(state => state.setPageName);
  const axios = useCustomAxios();
  const [orderData, setOrderData] = useState();
  //{{url}}/orders
  useEffect(() => {
    getOrders();
    setPageName(page);
  }, []);

  const getOrders = async () => {
    const { data } = await axios.get('/orders');
    console.log('data.item=>', data?.item);
    const list = data?.item.map(item => {
      return <ProductBuyListItem key={data?.item._id} item={item} />;
    });
    setOrderData(list);
  };

  return (
    <div>
      <ul>
        <li>{orderData}</li>
      </ul>
    </div>
  );
}

export default ProductBuyList;
