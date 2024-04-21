import { useEffect, useState } from 'react';
import usePageStore from '@zustand/pageName.mjs';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import ProductSellListItem from '@pages/mypage/ProductSellListItem';

function ProductSellList() {
  const page = '판매 목록';
  const setPageName = usePageStore(state => state.setPageName);
  const axios = useCustomAxios();
  const [pageParam, setPageParam] = useState(1);
  const [itemList, setItemList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const getSellList = async () => {
    try {
      const res = await axios.get('/seller/products', {
        params: {
          page: pageParam,
          limit: 3,
        },
      });
      const list = res?.data?.item?.map(item => {
        console.log('item', item);
        return <ProductSellListItem key={item?._id} item={item} />;
      });
      let newItemList = [...itemList, ...list];
      console.log('newItemList', newItemList);
      let endPage = res?.data?.pagination?.totalPages;
      let nowPage = res?.data?.pagination?.page;
      console.log(endPage);
      setTotalPages(endPage);
      setItemList(newItemList);
      setPageParam(nowPage + 1);
    } catch (error) {
      console.error('상품 정보 불러오기 실패', error);
    }
  };

  const handleClick = e => {
    if (pageParam < totalPages) {
      getSellList();
    } else if (pageParam == totalPages) {
      getSellList();
      e.target.className = 'hidden';
    }
  };

  useEffect(() => {
    setPageName(page);
    getSellList();
  }, []);
  return (
    <div className='mb-8 flex flex-col'>
      <ul>{itemList}</ul>
      <button className='mx-auto border border-main-color rounded-lg text-sm text-white tracking-widest' onClick={handleClick}>
      <img className="w-8" src="/src/assets/icons/icon-more.svg" alt="" />
    </button>
    </div>
    
  );
}

export default ProductSellList;
