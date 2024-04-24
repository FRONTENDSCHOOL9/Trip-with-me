import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const productSellListItem = ({ item }) => {
  const isSoldOut = item.buyQuantity >= item.quantity;

  return (
    <li className="font-notosans list-none ">
      <div className="py-16 px-5  max-w-sm w-full h-[440px] mx-auto mt-6 mb-10 relative  shadow-xl rounded-2xl sell-card overflow-hidden">
        <h3 className="absolute top-5 left-6 text-lg font-bold">
          My Sell Trip Card
        </h3>
        <div className="w-102.5 h-56 overflow-hidden rounded-[10px]">
          <Link to={`/product/${item._id}`}>
            <img
              src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${item?.mainImages[0]?.name}`}
              className="size-full object-cover"
            ></img>
          </Link>
        </div>
        <div className=" border-2 w-[320px] h-full rounded-tr-[44px] absolute top-[312px] left-0 bg-light-gray z-20 shadow-top">
          <Link to={`/product/${item._id}`}>
            <h4 className="mb-1 text-lg font-semibold  line-clamp-1 ml-6 mt-4">
              {item?.name}
            </h4>
          </Link>
        </div>
        <div className="absolute w-[384px] h-full top-[364px] left-0 bg-light-gray z-30">
          <div className="flex justify-between items-center gap-3 text-sm mx-6 mt-6">
            <div className="flex">
              <img
                src="/assets/icons/icon-group.svg"
                className="w-5 mr-1"
              ></img>
              {isSoldOut ? (
                <p className="bg-second-color font-semibold rounded-md p-1 mr-2">
                  모집 완료
                </p>
              ) : (
                <p className="font-semibold">
                  {item?.buyQuantity}/{item?.quantity}
                </p>
              )}
            </div>
            <p className=" font-semibold">
              {item?.extra?.date?.startDate} ~ {item?.extra?.date?.endDate}
            </p>
            <p className="my-auto flex mb-1 font-semibold">
              {item?.price
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
              원
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

productSellListItem.propTypes = {
  item: PropTypes.object,
};

export default productSellListItem;
