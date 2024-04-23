import { useEffect, useState } from 'react';
import usePageStore from '@zustand/pageName.mjs';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import ProductLikeListItem from '@pages/mypage/ProductLikeListItem';
import { BeatLoader } from 'react-spinners';

function ProductLikeList() {
  const page = '찜 목록';
  const setPageName = usePageStore(state => state.setPageName);
  const axios = useCustomAxios();
  const [likeData, setLikeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getLikeData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('/bookmarks/product');
      const likeList = res?.data?.item?.map(item => {
        return <ProductLikeListItem key={item._id} item={item} />;
      });
      setLikeData(likeList);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getLikeData();
    setPageName(page);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75 ">
        <BeatLoader color="#68A9ED" />
      </div>
    );
  }

  // console.log('likeData=>', likeData);
  return <div className="flex flex-col gap-3s ">{likeData}</div>;
}

export default ProductLikeList;
