import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const MainProductListItem = ({ item }) => {
  const isSoldOut = item.buyQuantity >= item.quantity;
  return (
    <li
      className={classNames('productBox', {
        relative: isSoldOut,
      })}
    >
      {isSoldOut && (
        <Link
          to={`/products/${item.id}`}
          className="absolute inset-0 flex justify-center items-center"
        >
          <div className="bg-black bg-opacity-50 w-full h-full flex justify-center items-center">
            <p className="text-white text-3xl font-bold">모집 마감되었어요.</p>
          </div>
        </Link>
      )}
      <div className="productBox-img">
        <Link to={`/products/${item.id}`}>
          <img
            src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${item?.mainImages[0]?.name}`}
            className="img-item"
          ></img>
        </Link>
      </div>

      <div className="productBox-info">
        <Link to={`/products/${item.id}`}>
          <h3 className="productTitle">{item?.name}</h3>
        </Link>
        <div className="productBox-limit">
          <img
            src="../src/assets/icons/icon-group.svg"
            className="img-limit"
          ></img>
          <p className="limit">
            {item?.buyQuantity}/{item?.quantity}
          </p>
        </div>

        <div className="productBox-etc">
          {item?.extra?.themes?.map(item => {
            <a href="#" className="tag" key={item.id}>
              # {item.name}
            </a>;
          })}
          <button type="button">
            <img
              src="../src/assets/icons/icon-heart-disabled.svg"
              className="img-like"
            ></img>
          </button>
          <p>2024</p>
        </div>
      </div>
    </li>
  );
};

MainProductListItem.propTypes = {
  item: PropTypes.object,
};

export default MainProductListItem;
