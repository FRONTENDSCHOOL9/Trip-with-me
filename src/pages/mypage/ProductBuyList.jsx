import useCustomAxios from '@hooks/useCustomAxios.mjs';
import ProductBuyListItem from '@pages/mypage/ProductBuyListItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import usePageStore from '@zustand/pageName.mjs';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

function ProductBuyList() {
  const page = '구매 목록';
  const setPageName = usePageStore(state => state.setPageName);
  const axios = useCustomAxios();
  // const [orderData, setOrderData] = useState();

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['orders'],
    queryFn: ({ pageParam = 1 }) =>
      axios.get(`/orders`, {
        params: {
          page: pageParam,
          limit: 6,
          sort: JSON.stringify({ _id: -1 }),
        },
      }),

    getNextPageParam: (lastPage, allPages) => {
      console.log('lastPage', lastPage);
      const totalPages = lastPage.data.pagination.totalPages;
      let nextPage = allPages.length < totalPages ? allPages.length + 1 : false;
      return nextPage;
    },
  });

  useEffect(() => {
    // getOrders();
    setPageName(page);
  }, []);

  // const getOrders = async () => {
  //   const { data } = await axios.get('/orders');
  //   console.log('data.item=>', data?.item);
  //   const list = data?.item.map(item => {
  //     return <ProductBuyListItem key={item._id} item={item} />;
  //   });
  //   setOrderData(list);
  // };

  const list = data?.pages?.flatMap(page =>
    page.data.item.map(item => (
      <ProductBuyListItem key={item._id} item={item} />
    )),
  );
  const hasNext =
    data?.pages.at(-1).data.pagination.page <
    data?.pages.at(-1).data.pagination.totalPages;

  return (
    <div>
      <InfiniteScroll pageStart={1} loadMore={fetchNextPage} hasMore={hasNext}>
        {/* <div>{orderData}</div> */}
        {list || []}
      </InfiniteScroll>
    </div>
  );
}

export default ProductBuyList;
