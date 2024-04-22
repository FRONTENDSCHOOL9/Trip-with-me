import useCustomAxios from '@hooks/useCustomAxios.mjs';
import MainProductListItem from '@pages/product/MainProductListItem';
import { useEffect, useState } from 'react';

const NewProduct = () => {
  const axios = useCustomAxios();
  const [itemList, setItemList] = useState([]);
  const [pageParam, setPageParam] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async () => {
    try {
      const res = await axios.get('/products', {
        params: {
          page: pageParam,
          limit: 3,
        },
      });
      const { item } = res.data;

      const sortedProducts = item.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });

      const list = sortedProducts.map(product => (
        <MainProductListItem key={product._id} item={product} />
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
      <div className="flex flex-col gap-[6px]">
        <div className="card">
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
    <div className="mb-8 flex flex-col">
      <ul>{itemList}</ul>
      <button
        className="mx-auto border border-main-color rounded-lg text-sm text-white tracking-widest"
        onClick={handleClick}
      >
        <img className="w-8" src="/src/assets/icons/icon-more.svg" alt="" />
      </button>
    </div>
  );
};

export default NewProduct;
