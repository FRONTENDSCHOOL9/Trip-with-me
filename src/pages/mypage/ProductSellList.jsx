import { useEffect, useState } from 'react';
import usePageStore from '@zustand/pageName.mjs';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import ProductSellListItem from '@pages/mypage/ProductSellListItem';
import { BeatLoader } from 'react-spinners';

function ProductSellList() {
  const page = '판매 목록';
  const setPageName = usePageStore(state => state.setPageName);
  const axios = useCustomAxios();
  const [pageParam, setPageParam] = useState(1);
  const [itemList, setItemList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const getSellList = async () => {
    setIsLoading(true);
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
      setIsEnd(endPage === nowPage);
      console.log(endPage);
      setTotalPages(endPage);
      setItemList(newItemList);
      setPageParam(nowPage + 1);
      setIsLoading(false);
    } catch (error) {
      console.error('상품 정보 불러오기 실패', error);
      setIsLoading(false);
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
    <div className="flex flex-col h-full font-notosans">
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
      {!isLoading && !isEnd && itemList.length > 0 && (
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

export default ProductSellList;
