import useCustomAxios from '@hooks/useCustomAxios.mjs';
import ProductBuyListItem from '@pages/mypage/ProductBuyListItem';
import usePageStore from '@zustand/pageName.mjs';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

function ProductBuyList() {
  const page = '구매 목록';
  const setPageName = usePageStore(state => state.setPageName);
  const axios = useCustomAxios();
  const [pageParam, setPageParam] = useState(1);
  const [itemList, setItemList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  useEffect(() => {
    getBuyList();
    setPageName(page);
  }, []);

  const handleClick = e => {
    if (pageParam < totalPages) {
      getBuyList();
    } else if (pageParam === totalPages) {
      getBuyList();
      e.target.className = 'hidden';
    }
  };

  const getBuyList = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('/orders', {
        params: {
          sort: `{ "products.extra.date.endDate": -1 }`,
          page: pageParam,
          limit: 3,
        },
      });
      const list = res?.data?.item?.map(item => {
        return <ProductBuyListItem key={item?._id} item={item} />;
      });
      let newItemList = [...itemList, ...list];
      console.log('newItemList', newItemList);
      // console.log('res', res);
      let endPage = res?.data?.pagination?.totalPages;
      let nowPage = res?.data?.pagination?.page;
      setIsEnd(endPage === nowPage);

      console.log(endPage);
      setTotalPages(endPage);
      setItemList(newItemList);
      setPageParam(nowPage + 1);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
  //       <BeatLoader color="#68A9ED" />
  //     </div>
  //   );
  // }
  return (
    <div className="mb-8 flex flex-col">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
          <BeatLoader color="#68A9ED" />
        </div>
      )}
      {itemList}
      {/* {isLoading && } */}

      {!isLoading && !isEnd && (
        <button
          id="more"
          className="mx-auto border border-main-color rounded-lg text-sm text-white tracking-widest"
          onClick={handleClick}
        >
          <img className="w-8" src="/src/assets/icons/icon-more.svg" alt="" />
        </button>
      )}
    </div>
  );
}

export default ProductBuyList;
