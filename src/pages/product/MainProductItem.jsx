import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import ProductLikeButton from '@components/ProductLikeButton';

const MainProductItem = ({ item }) => {
  const isSoldOut = item.buyQuantity >= item.quantity;
  const [likeState, setLikeState] = useState(true);
  const [likeId, setLikeId] = useState(item?._id);
  const axios = useCustomAxios();

  console.log('item', item, item?._id);

  const handleLike = async e => {
    setLikeState(prevState => !prevState);

    if (likeState === false) {
      try {
        const res = await axios.delete(`/bookmarks/${likeId}`);
        e.target.src = '/src/assets/icons/icon-heart-disabled.svg';
        console.log(res);
        console.log('좋아요 제거한 경우 item._id =>', likeId);
      } catch (err) {
        console.log(err);
      }
    } else if (likeState === true) {
      try {
        //좋아요 누를 때에는 상품 id를 보낸다.
        const res = await axios.post(`/bookmarks/product/${item?._id}`, {});
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
    <li className="h-80 p-2 mb-8 font-notosans">
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
            <div className="bg-black bg-opacity-45 w-full h-full flex justify-center items-center ">
              <p className="text-zinc-200 text-3xl font-bold">
                모집 마감되었어요.
              </p>
            </div>
          </Link>
        )}
        <div className=" border-[1px] rounded-2xl bg-gray-100 ">
          <div className="w-102.5 h-56 overflow-hidden rounded-t-lg">
            <Link to={`/product/${item._id}`}>
              <img
                className="size-full object-cover"
                src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${item?.mainImages[0]?.name}`}
              />
            </Link>
          </div>

          <div className="p-3 relative flex flex-col gap-1 ">
            <Link to={`/product/${item._id}`}>
              <h3 className="text-lg font-medium w-10/12 flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
                {item?.name}
              </h3>
            </Link>
            <div className="flex text-sm ">
              <img
                src="../src/assets/icons/icon-group.svg"
                className="w-5 mr-1"
              />
              <p className="text-sm">{`${item?.buyQuantity}/${item?.quantity}`}</p>
            </div>

            <div className="mt-1">
              {item.extra?.themes?.map(theme => (
                <a
                  href="#"
                  className="bg-indigo-100  mr-2 px-1 py-1 text-center text-sm font-medium rounded-lg"
                  key={theme.id}
                >
                  {theme.name}
                </a>
              ))}
            </div>

            <div className="absolute top-8 right-7 text-center">
              <ProductLikeButton item={item} />
              {/* <button type="button">
                <img
                  onClick={handleLike}
                  src="/src/assets/icons/icon-heart-disabled.svg"
                  className="w-8"
                />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

MainProductItem.propTypes = {
  item: PropTypes.object,
};

export default MainProductItem;
