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

  return (
    <div className="flex flex-col h-full font-notosans">
      {likeData.length > 0 && likeData}
      {likeData.length === 0 && !isLoading && (
        <div className="flex flex-col justify-center items-center h-[780px] text-lg">
          <p className="text-center mt-4">{`${page}에 아무것도 없어요..`}</p>
          <p>{`같이 여행을 떠날 동행 메이트를 모집해보세요😄`}</p>
        </div>
      )}
      {isLoading && (
        <div className="my-auto flex justify-center items-center">
          <BeatLoader color="#68A9ED" />
        </div>
      )}
    </div>
  );
}

export default ProductLikeList;
