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
    <div className="py-16 px-5 max-w-sm w-full h-[460px] mx-auto mt-6 mb-2 font-notosans relative  shadow-xl rounded-2xl like-card overflow-hidden">
      <h3 className="absolute top-5 left-6 text-lg font-bold">
        My Like Trip Card
      </h3>
      <div className="w-full mx-auto ">
        <Link to={`/product/${item?.product?._id}`}>
          <div className="w-102.5 h-56 overflow-hidden rounded-xl mb-2 shadow-xl">
            <img
              className="size-full object-cover"
              src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${item?.product?.image?.name}`}
            />
          </div>
        </Link>
        <div className="border-2 w-[320px] h-full rounded-tr-[44px] absolute top-[312px] left-0 bg-light-gray z-20 shadow-top">
          <div className="flex flex-col">
            <Link to={`/product/${item?.product?._id}`} className="w-full">
              <div className="flex flex-col justify-start  pt-4 px-6 mb-4 ">
                <h4 className="mb-1 text-lg font-semibold  line-clamp-1 ">
                  {item?.product?.name}
                </h4>
                <p className="text-lg  font-semibold">{won}원</p>
              </div>
            </Link>
            <div className="absolute w-[384px] h-full top-[60px] left-0 bg-light-gray -z-10 ">
              <div className="flex gap-2 items-center px-5 ml-auto mt-10 ">
                {item?.product?.extra?.themes?.map(item => (
                  <p
                    className="text-sm border-2 border-mid-gray bg-light-gray border- rounded-full py-1 px-4  "
                    key={item.id}
                  >
                    {item.name}
                  </p>
                ))}
                <LikeButton item={item} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductLikeListItem;
