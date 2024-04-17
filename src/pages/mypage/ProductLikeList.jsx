import { useEffect, useState } from 'react';
import usePageStore from '@zustand/pageName.mjs';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import ProductLikeListItem from '@pages/mypage/ProductLikeListItem';
// import '@components/style/productLikeList.css';

function ProductLikeList() {
  const page = '찜 목록';
  const setPageName = usePageStore(state => state.setPageName);
  const axios = useCustomAxios();
  const [likeData, setLikeData] = useState([]);

  const getLikeData = async () => {
    const res = await axios.get('/bookmarks/product');
    const likeList = res?.data?.item?.map(item => {
      return <ProductLikeListItem key={item._id} item={item} />;
    });
    setLikeData(likeList);
  };
  useEffect(() => {
    getLikeData();
    setPageName(page);
  }, []);
  return <div className="flex flex-col gap-3">{likeData}</div>;
}

export default ProductLikeList;
