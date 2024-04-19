import { useEffect, useState } from 'react';
import usePageStore from '@zustand/pageName.mjs';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import ProductSellListItem from '@pages/mypage/ProductSellListItem';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from '@tanstack/react-query';

function ProductSellList() {
  const page = '판매 목록';
  const setPageName = usePageStore(state => state.setPageName);
  const axios = useCustomAxios();
  const [sellData, setSellData] = useState([]);
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['/seller/products'],
    queryFn: ({ pageParam = 1 }) =>
      axios.get(`/seller/products`, {
        params: {
          page: pageParam,
          limit: 3,
        },
      }),

    getNextPageParam: (lastPage, allPages) => {
      console.log('lastPage', lastPage);
      const totalPages = lastPage.data.pagination.totalPages;
      let nextPage =
        allPages.length < totalPages ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  // latestProcudts = renderProductItems = productList
  const latestProcudts = data?.pages?.flatMap(page =>
    page.data.item.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    }),
  );

  const renderProductItems = items => {
    return items.map(item => (
      <ProductSellListItem key={item?._id} item={item} />
    ));
  };

  useEffect(() => {
    if (data) {
      const productList = renderProductItems(latestProcudts);
      setSellData(productList);
    }
    setPageName(page);
  }, [data]);

  const hasNext =
    data?.pages.at(-1).data.pagination.page <
    data?.pages.at(-1).data.pagination.totalPages;
  // const getSellProduct = async () => {
  //   try {
  //     const response = await axios.get('/seller/products');
  //     const list = response?.data?.item?.map(item => {
  //       console.log('item', item);
  //       return <ProductSellListItem key={item?._id} item={item} />;
  //     });
  //     setSellData(list);
  //     console.log('list', list);
  //   } catch (error) {
  //     console.error('상품 정보 불러오기 실패', error);
  //   }
  // };

  // useEffect(() => {
  //   setPageName(page);
  //   getSellProduct();
  // }, []);
  return (
    <div>
      <ul>
        <li>
          <InfiniteScroll
            pageStart={1}
            loadMore={fetchNextPage}
            hasMore={hasNext}
          >
            {sellData}
          </InfiniteScroll>
        </li>
        {/* <li>{sellData}</li> */}
      </ul>
    </div>
  );
}

export default ProductSellList;
