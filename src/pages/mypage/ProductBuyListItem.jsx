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
    <div className="py-2 px-5 mb-2 rounded-lg p-2 min-h-80">
      <Link to={`/product/${item?.products[0]?._id}`}>
        <div className='w-102.5 h-56 overflow-hidden rounded-xl mb-2'>
        <img
        className='size-full object-cover'
          src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${item?.products[0]?.image?.name}`}
          alt=""
        />
        </div>
        <p className='font-semibold text-sm'>{item?.products[0]?.name}</p>
        </Link>
        <div className='h-10flex items-center justify-between'>
        <p className='text-sm'>
          {item?.products[0]?.extra?.date?.startDate} ~{' '}
          {item?.products[0]?.extra?.date?.endDate}
        </p>
        <p className='my-auto flex mb-1'>
          <span className='bg-second-color text-xs rounded-md p-1 mr-2'>구매완료</span> 
          {item?.products[0]?.price} 원
        </p>
        </div>
      <button className="bg-main-color text-white w-full p-1 rounded-lg" type="button" onClick={onClick}>
        여행장 리뷰 쓰기{' '}
      </button>
      {isClick && <ReviewItem key={item._id} item={item} />}
    </div>
  );
}

export default ProductBuyListItem;
