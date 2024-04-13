import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

ProductBuyListItem.propTypes = {
  item: PropTypes.array,
};
function ProductBuyListItem({ item }) {
  return (
    <Link to={`/product/${item?.products[0]?._id}`}>
      <p>이미지</p>
      <p>{item?.products[0]?.name}</p>
      <p>날짜</p>
    </Link>
  );
}

export default ProductBuyListItem;
