import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const MainProductListItem = ({ item }) => {
  const isSoldOut = item.buyQuantity >= item.quantity;

  return (
    <li className="h-[330px] p-2">
      <div
        className={classNames({
          relative: isSoldOut,
        })}
      >
        {isSoldOut && (
          <Link
            to={`/products/${item.id}`}
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
            <Link to={`/products/${item.id}`}>
              <img
                src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${item?.mainImages[0]?.name}`}
              />
            </Link>
          </div>

          <div className="p-2 relative">
            <Link to={`/products/${item.id}`}>
              <h3 className="text-base font-medium">{item.name}</h3>
            </Link>
            <div className="flex text-sm">
              <img
                src="../src/assets/icons/icon-group.svg"
                className="w-4 mr-1"
              />
              <p>{`${item.buyQuantity}/${item.quantity}`}</p>
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

            <div className="absolute top-5 right-7 text-center">
              <button type="button">
                <img
                  src="../src/assets/icons/icon-heart-disabled.svg"
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
