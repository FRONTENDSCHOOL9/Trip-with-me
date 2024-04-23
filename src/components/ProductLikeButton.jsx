import useCustomAxios from '@hooks/useCustomAxios.mjs';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

ProductLikeButton.propTypes = {
  item: PropTypes.object,
};

function ProductLikeButton({ item }) {
  // console.log('좋아요item', item);
  // const [likeState, setLikeState] = useState(false);
  let likeState = false;
  // const [productLikeId, setProductLikeId] = useState(0);
  let productLikeId = 0;
  const axios = useCustomAxios();
  const [initLikeState, setInitLikeState] = useState(false);
  //icon-heart-full.svg

  useEffect(() => {
    checkInit();
  }, []);

  const checkInit = () => {
    if (item?.myBookmarkId) {
      setInitLikeState(
        <img
          onClick={handleLikeProduct}
          className="w-6 h-6 ml-auto mr-2 cursor-pointer"
          src="/src/assets/icons/icon-heart-full.svg"
          alt=""
        />,
      );
      // setLikeState(false);
      likeState = false;
      productLikeId = item?.myBookmarkId;
    } else {
      // console.log('false');
      setInitLikeState(
        <img
          onClick={handleLikeProduct}
          className="w-6 h-6 ml-auto mr-2 cursor-pointer"
          src="/src/assets/icons/icon-heart-disabled.svg"
          alt=""
        />,
      );
      // setLikeState(true);
      likeState = true;
    }
  };

  const handleLikeProduct = async e => {
    console.log('변경 실행됨');
    // console.log('item',item?.bookmarks);
    console.log('state 상태', likeState);
    if (likeState === false) {
      try {
        await axios.delete(`/bookmarks/${productLikeId}`);
        e.target.src = '/src/assets/icons/icon-heart-disabled.svg';
        console.log('좋아요 제거한 경우 item._id =>', productLikeId);
        likeState = !likeState;
      } catch (err) {
        console.log(err);
      }
    } else if (likeState === true) {
      try {
        //좋아요 누를 때에는 상품 id를 보낸다.
        const res = await axios.post(`/bookmarks/product/${item?._id}`, {});
        productLikeId = res?.data?.item?._id;
        console.log(
          '좋아요 누른 경우 북마크 id 새로 세팅 =>',
          res?.data?.item?._id,
        );
        // console.log('res =>', res);
        e.target.src = '/src/assets/icons/icon-heart-full.svg';
        // setLikeState(prevState => !prevState);
        likeState = !likeState;
      } catch (err) {
        console.log(err);
      }
    }
  };

  return <>{initLikeState}</>;
}

export default ProductLikeButton;
