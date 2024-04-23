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

  return (
    <div className="flex flex-col h-full font-notosan">
      {itemList.length === 0 && !isLoading && (
        <div className="flex flex-col justify-center items-center h-[780px] text-lg">
          <p className="text-center mt-4">{`${page}에 아무것도 없어요..`}</p>
          <p>{`같이 여행을 떠날 동행 메이트를 모집해보세요😄`}</p>
        </div>
      )}
      {itemList.length > 0 && <ul>{itemList}</ul>}
      {isLoading && (
        <div className="my-auto flex justify-center items-center">
          <BeatLoader color="#68A9ED" />
        </div>
      )}
      {/* {isLoading && } */}

      {!isLoading && !isEnd && (
        <div className="flex flex-col justify-center items-center">
          <button
            className="bg-blue-500 py-2 px-4 rounded-lg animate-pulse text-sm font-medium text-white mt-6"
            onClick={handleClick}
          >
            더 보기
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductBuyList;
