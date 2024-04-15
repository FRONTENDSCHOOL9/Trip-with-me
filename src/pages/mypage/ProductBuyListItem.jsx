import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReviewItem from '@pages/mypage/ReviewItem';
import { useState } from 'react';

// {
//   "order_id": 1,
//   "product_id": 2, -> 여행장 userID
//   "rating": 3,
//   "content": "친절하셨어요",
// }
//시나리오 : 게시물 작성자 ID 와 후기 order_id가 같은 경우에만 해당 후기 불러오기

ProductBuyListItem.propTypes = {
  item: PropTypes.object,
};
function ProductBuyListItem({ item }) {
  const [isClick, setIsClick] = useState(false);
  const onClick = () => {
    if (isClick === false) setIsClick(true);
    if (isClick === true) setIsClick(false);
  };
  return (
    <div className="border border-gray-200 shadow mb-2 rounded-lg p-2">
      <Link to={`/product/${item?.products[0]?._id}`}>
        <img
          src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${item?.products[0]?.image?.name}`}
          alt=""
        />
        <p>상품명 : {item?.products[0]?.name}</p>
        <p>날짜 : {item?.products[0]?.extra?.date}</p>
      </Link>
      <button type="button" onClick={onClick}>
        여행장 리뷰 쓰기{' '}
      </button>
      {isClick && <ReviewItem key={item._id} item={item} />}
    </div>
  );
}

export default ProductBuyListItem;
