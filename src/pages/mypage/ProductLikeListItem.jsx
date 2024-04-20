import LikeButton from '@components/LikeButton';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

ProductLikeListItem.propTypes = {
  item: PropTypes.object,
};

function ProductLikeListItem({ item }) {

  console.log('item=>', item);
  const won = item?.product?.price
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

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
          <LikeButton item={item}/>
        </div>
      </div>
    </div>
  );
}

export default ProductLikeListItem;
