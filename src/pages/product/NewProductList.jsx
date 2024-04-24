import useCustomAxios from '@hooks/useCustomAxios.mjs';
import MainProductItem from '@pages/product/MainProductItem';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NewProductList = () => {
  const axios = useCustomAxios();
  const [itemList, setItemList] = useState([]);
  const [pageParam, setPageParam] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async () => {
    try {
      const res = await axios.get('/products?sort={"createdAt": -1}', {
        params: {
          page: pageParam,
          limit: 3,
        },
      });
      const { item } = res.data;
      console.log('new', item);
      const list = item.map(product => (
        <MainProductItem key={uuidv4()} item={product} />
      ));
      let newItemList = [...itemList, ...list];
      console.log('newItemList', newItemList);
      let endPage = res?.data?.pagination?.totalPages;
      let nowPage = res?.data?.pagination?.page;

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
      getProducts();
    } else if (pageParam == totalPages) {
      getProducts();
      e.target.className = 'hidden';
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-[6px] ml-2">
        <div className="card ">
          <div className="spinner"></div>
        </div>
        <div className="cardDescription flex flex-col gap-3 justify-center">
          <span className="line line-1"></span>
          <span className="line line-1"></span>
          <span className="line line-2"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 flex flex-col font-notosans">
      <ul>{itemList}</ul>
      <div className="flex flex-col justify-center items-center">
        <button
          className="bg-blue-500 py-2 px-4 rounded-lg animate-pulse text-sm font-medium text-white mt-6"
          onClick={handleClick}
        >
          더 보기
        </button>
      </div>
    </div>
  );
};

export default NewProductList;
