import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const productSellListItem = ({ item }) => {
  const isSoldOut = item.buyQuantity >= item.quantity;

  return (
    <li
      className={classNames('h-80 p-7 mb-1 font-notosans', {
        relative: isSoldOut,
      })}
    >
      {isSoldOut && (
        <Link
          to={`/product/${item._id}`}
          className="absolute inset-0 flex justify-center items-center"
        >
          <div className="bg-black bg-opacity-45 w-full h-full flex justify-center items-center rounded-lg">
            <p className="text-zinc-200 text-3xl font-bold">
              모집 마감되었어요.
            </p>
          </div>
        </Link>
      )}
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
            <p>모집 완료</p>
          ) : (
            <p>
              {item?.buyQuantity}/{item?.quantity}
            </p>
          )}
        </div>

        <div className="mt-1">
          {item?.extra?.themes?.map(item => {
            <a
              href="#"
              className="bg-indigo-100 rounded mr-1 pb-0.5 px-0.5 text-sm font-medium"
              key={item.id}
            >
              # {item.name}
            </a>;
          })}
        </div>
      </div>
    </li>
  );
};

productSellListItem.propTypes = {
  item: PropTypes.object,
};

export default productSellListItem;
