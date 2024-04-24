import useCustomAxios from '@hooks/useCustomAxios.mjs';
import PropTypes from 'prop-types';
import { useState } from 'react';

LikeButton.propTypes = {
  item: PropTypes.object,
  state: PropTypes.string,
};

function LikeButton({ item }) {
  const [likeId, setLikeId] = useState(item?._id);
  const axios = useCustomAxios();
  const [likeState, setLikeState] = useState(false);
  //icon-heart-full.svg

  const handleLike = async e => {
    setLikeState(prevState => !prevState);
    //좋아요를 제거한 경우
    if (likeState === false) {
      try {
        const res = await axios.delete(`/bookmarks/${likeId}`);
        e.target.src = '/assets/icons/icon-heart-disabled.svg';
        console.log(res);
        console.log('좋아요 제거한 경우 item._id =>', likeId);
      } catch (err) {
        console.log(err);
      }
    }
    //다시 좋아요를 누른 경우
    else if (likeState === true) {
      try {
        //좋아요 누를 때에는 상품 id를 보낸다.
        const res = await axios.post(
          `/bookmarks/product/${item?.product?._id}`,
          {},
        );
        setLikeId(res?.data?.item?._id);
        console.log(
          '좋아요 누른 경우 북마크 id 새로 세팅 =>',
          res?.data?.item?._id,
        );
        // console.log('res =>', res);
        e.target.src = '/assets/icons/icon-heart-full.svg';
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <img
        onClick={handleLike}
        className="w-6 h-6 ml-auto mr-2 cursor-pointer"
        src="/assets/icons/icon-heart-full.svg"
        alt=""
      />
    </>
  );
}

export default LikeButton;
