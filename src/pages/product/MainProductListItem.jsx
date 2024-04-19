import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';

const MainProductListItem = ({ item }) => {
  const isSoldOut = item.buyQuantity >= item.quantity;
  const [likeState, setLikeState] = useState(true);
  const [likeId, setLikeId] = useState(item?._id);
  const axios = useCustomAxios();

  console.log('item', item, item?._id);

  const handleLike = async (e) =>{
    setLikeState(prevState => !prevState);

    if(likeState === false){
      try {
        const res = await axios.delete(`/bookmarks/${likeId}`);
        e.target.src = '/src/assets/icons/icon-heart-disabled.svg';
        console.log(res);
        console.log('좋아요 제거한 경우 item._id =>', likeId);
      } catch (err) {
        console.log(err);
      }
    }
    else if (likeState === true) {
      try {
        //좋아요 누를 때에는 상품 id를 보낸다.
        const res = await axios.post(
          `/bookmarks/product/${item?._id}`,
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
    <li className="h-82.5 p-2 mb-1 font-notosans">
      <div
        className={classNames({
          relative: isSoldOut,
        })}
      >
        {isSoldOut && (
          <Link
            to={`/product/${item._id}`}
            className="absolute inset-0 flex justify-center items-center"
            style={{ zIndex: 1 }}
          >
            <div className="bg-black bg-opacity-45 w-full h-full flex justify-center items-center rounded-lg">
              <p className="text-zinc-200 text-3xl font-bold">
                모집 마감되었어요.
              </p>
            </div>
          </Link>
        )}
        <div>
          <div className="w-102.5 h-56 overflow-hidden rounded-[10px]">
            <Link to={`/product/${item._id}`}>
              <img
                className="size-full object-cover"
                src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${item?.mainImages[0]?.name}`}
              />
            </Link>
          </div>

          <div className="p-2 relative">
            <Link to={`/product/${item._id}`}>
              <h3 className="text-base font-medium max-w-70 flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                {item?.name}
              </h3>
            </Link>
            <div className="flex text-sm">
              <img
                src="../src/assets/icons/icon-group.svg"
                className="w-4 mr-1"
              />
              <p>{`${item?.buyQuantity}/${item?.quantity}`}</p>
            </div>

            <div className="mt-1">
              {item.extra?.themes?.map(theme => (
                <a
                  href="#"
                  className="bg-indigo-100 rounded mr-1 pb-0.5 px-0.5 text-sm font-medium"
                  key={theme.id}
                >
                  # {theme.name}
                </a>
              ))}
            </div>

            <div className="absolute top-8 right-7 text-center">
              <button type="button">
                <img
                  onClick={handleLike}
                  src="/src/assets/icons/icon-heart-disabled.svg"
                  className="w-8"
                />
              </button>
              <p className="-mt-2">{item?.bookmarks}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

MainProductListItem.propTypes = {
  item: PropTypes.object,
};

export default MainProductListItem;
