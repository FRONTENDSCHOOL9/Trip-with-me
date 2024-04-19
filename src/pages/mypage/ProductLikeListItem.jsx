import useCustomAxios from '@hooks/useCustomAxios.mjs';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

ProductLikeListItem.propTypes = {
  item: PropTypes.object,
};

function ProductLikeListItem({ item }) {
  const axios = useCustomAxios();
  const [likeState, setLikeState] = useState(false);
  const [likeId, setLikeId] = useState(item?._id);

  console.log('item=>', item);
  const won = item?.product?.price
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

  const handleLike = async e => {
    setLikeState(prevState => !prevState);
    //좋아요를 제거한 경우
    if (likeState === false) {
      try {
        const res = await axios.delete(`/bookmarks/${likeId}`);
        e.target.src = '/src/assets/icons/icon-heart-disabled.svg';
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
        e.target.src = '/src/assets/icons/icon-heart-full.svg';
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="py-2 px-5 max-w-sm w-full mx-auto mb-2">
      <div className="w-full mx-auto">
        <Link to={`/product/${item?.product?._id}`}>
          <div className="w-102.5 h-56 overflow-hidden rounded-xl mb-2">
            <img
              className="size-full object-cover"
              src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${item?.product?.image?.name}`}
            />
          </div>
        </Link>
        <div className="flex gap-5">
          <Link to={`/product/${item?.product?._id}`} className="w-full">
            <p className="mb-1 text-sm ">{item?.product?.name}</p>
          </Link>
          <p className="shrink-0 text-right mb-1 ml-auto font-bold text-sm ">
            {won}원
          </p>
        </div>
        <div className="flex items-center">
          {item?.product?.extra?.themes?.map(item => (
            <p
              className="p-0.5 mr-1 my-auto border-2 text-xs bg-second-color rounded "
              key={item.id}
            >
              {item.name}
            </p>
          ))}
          <img
            onClick={handleLike}
            className="w-6 h-6 ml-auto mr-2 cursor-pointer "
            src="/src/assets/icons/icon-heart-full.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default ProductLikeListItem;
