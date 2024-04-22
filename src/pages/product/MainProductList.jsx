import Footer from '@components/layout/Footer';
import { useEffect, useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import MainProductListItem from '@pages/product/MainProductListItem';
import Title from '@components/Title';
import Search from '@components/Search';
import SubTitle from '@components/SubTitle';
import PopularProductList from '@pages/product/PopularProductList';
import { BeatLoader } from 'react-spinners';
import '@components/style/spinners.css';

// import InfiniteScroll from 'react-infinite-scroller';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { v4 as uuidv4 } from 'uuid';

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
            <div className=" flex flex-col gap-[6px]">
              <div className="card">
                <div className="spinner">
                  {/* <BeatLoader size={15} color="#3c4048" /> */}
                </div>
              </div>
              <div className="cardDescription flex flex-col gap-3 justify-center ">
                <span className="line line-1"></span>
                <span className="line line-1"></span>
                <span className="line line-2"></span>
              </div>
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
            <div className=" flex flex-col gap-[6px]">
              <div className="card">
                <div className="spinner">
                  {/* <BeatLoader size={15} color="#3c4048" /> */}
                </div>
              </div>
              <div className="cardDescription flex flex-col gap-3 justify-center ">
                <span className="line line-1"></span>
                <span className="line line-1"></span>
                <span className="line line-2"></span>
              </div>
            </div>
          ) : (
            // <div className="flex justify-center items-center h-[500px]">
            //   <BeatLoader color="#68A9ED" />
            // </div>
            <ul>{products}</ul>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MainProductList;
