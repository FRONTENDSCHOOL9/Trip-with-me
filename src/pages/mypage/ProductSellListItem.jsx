import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const productSellListItem = ({ item }) => {
  const isSoldOut = item.buyQuantity >= item.quantity;

  return (
    <li className="h-80 p-7 mb-5 font-notosans">
      <div className="w-102.5 h-56 overflow-hidden rounded-[10px]">
        <Link to={`/product/${item._id}`}>
          <img
            src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${item?.mainImages[0]?.name}`}
            className="size-full object-cover"
          ></img>
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
          ></img>
          {isSoldOut ? (
            <p className="bg-second-color text-xs rounded-md p-1 mr-2">
              모집 완료
            </p>
          ) : (
            <p>
              {item?.buyQuantity}/{item?.quantity}
            </p>
          )}
        </div>

        <div className="h-10flex items-center justify-between">
          <p className="text-sm">
            {item?.extra?.date?.startDate} ~ {item?.extra?.date?.endDate}
          </p>
          <p className="my-auto flex mb-1">{item?.price} 원</p>
        </div>
      </div>
    </li>
  );
};

productSellListItem.propTypes = {
  item: PropTypes.object,
};

export default productSellListItem;
