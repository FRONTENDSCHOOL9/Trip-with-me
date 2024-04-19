import Footer from '@components/layout/Footer';
import { useEffect, useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import MainProductListItem from '@pages/product/MainProductListItem';
import Title from '@components/Title';
import Search from '@components/Search';
import SubTitle from '@components/SubTitle';
import PopularProductList from '@pages/product/PopularProductList';
import { BeatLoader } from 'react-spinners';
// import InfiniteScroll from 'react-infinite-scroller';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { v4 as uuidv4 } from 'uuid';

function MainProductList() {
  const axios = useCustomAxios();
  const [isLoading, setIsLoading] = useState(false);

  // const [products, setProducts] = useState([]);
  // const { data, fetchNextPage } = useInfiniteQuery({
  //   queryKey: ['products'],
  //   queryFn: ({ pageParam = 1 }) =>
  //     axios.get(`/products`, {
  //       params: {
  //         page: pageParam,
  //         limit: 3,
  //       },
  //     }),

  //   getNextPageParam: (lastPage, allPages) => {
  //     console.log('lastPage', lastPage);
  //     const totalPages = lastPage.data.pagination.totalPages;
  //     let nextPage =
  //       allPages.length < totalPages ? allPages.length + 1 : undefined;
  //     return nextPage;
  //   },
  // });

  // // latestProcudts = renderProductItems = productList
  // const latestProcudts = data?.pages?.flatMap(page =>
  //   page.data.item.sort((a, b) => {
  //     const dateA = new Date(a.createdAt);
  //     const dateB = new Date(b.createdAt);
  //     return dateB - dateA;
  //   }),
  // );

  // const renderProductItems = items => {
  //   return items.map(item => (
  //     <MainProductListItem key={uuidv4()} item={item} />
  //   ));
  // };

  // useEffect(() => {
  //   if (data) {
  //     const productList = renderProductItems(latestProcudts);
  //     setProducts(productList);
  //   }
  // }, [data]);

  // const hasNext =
  //   data?.pages.at(-1).data.pagination.page <
  //   data?.pages.at(-1).data.pagination.totalPages;

  // 이전
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/products');
      const { item } = response.data;

      const sortedProducts = item.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });

      const productList = sortedProducts.map(product => (
        <MainProductListItem key={product._id} item={product} />
      ));

      setProducts(productList);
      setIsLoading(false);
    } catch (error) {
      console.error('상품 정보 불러오기 실패', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="layout">
      <div className="scrollbar p-4">
        <Title />

        <Search />

        <div>
          <SubTitle
            iconSrc="../src/assets/icons/icon-love.png"
            title="지금 인기있는 여행지"
          />
          {isLoading ? (
            <div className="text-center mt-4">
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
          {/* <ul>
            <InfiniteScroll
              pageStart={1}
              loadMore={fetchNextPage}
              hasMore={hasNext}
            >
              {products}
            </InfiniteScroll>
          </ul> */}

          {isLoading ? (
            <div className="flex justify-center items-center h-[500px]">
              <BeatLoader color="#68A9ED" />
            </div>
          ) : (
            <ul>{products}</ul>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MainProductList;
