import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MainProductListItem = ({ item }) => {
  console.log('item', item);
  return (
    <li className="productBox">
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
