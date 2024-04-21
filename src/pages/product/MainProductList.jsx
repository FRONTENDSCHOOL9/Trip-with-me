import Footer from '@components/layout/Footer';
import { useEffect, useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import MainProductListItem from '@pages/product/MainProductListItem';
import Title from '@components/Title';
import Search from '@components/Search';
import SubTitle from '@components/SubTitle';
import PopularProductList from '@pages/product/PopularProductList';
import { BeatLoader } from 'react-spinners';

function MainProductList() {
  const axios = useCustomAxios();
  const [isLoading, setIsLoading] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [pageParam, setPageParam] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getProducts = async () => {
    setIsLoading(true);
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

  return (
    <div className="layout">
      <Title />

      <Search />
      <div className="scrollbar p-4">
        <div>
          <SubTitle
            iconSrc="../src/assets/icons/icon-love.png"
            title="지금 인기있는 여행지"
          />
          {isLoading ? (
            <div className="text-center mt-4 flex justify-center items-center h-[330px]">
              <BeatLoader color="#68A9ED" />
            </div>
          ) : (
            <PopularProductList />
          )}
        </div>

        <div>
          <SubTitle
            iconSrc="../src/assets/icons/icon-tour-guide.png"
            title="새로 올라왔어요"
          />

          {isLoading ? (
            <div className="flex justify-center items-center h-[500px]">
              <BeatLoader color="#68A9ED" />
            </div>
          ) : (
            <div className="mb-8 flex flex-col">
              <ul>{itemList}</ul>
              <button
                className="mx-auto border border-main-color rounded-lg text-sm text-white tracking-widest"
                onClick={handleClick}
              >
                <img
                  className="w-8"
                  src="/src/assets/icons/icon-more.svg"
                  alt=""
                />
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MainProductList;
