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
    <div className="font-notosans ">
      <div className=" py-16 px-5 max-w-sm w-full h-[450px] mx-auto mt-6 mb-2 relative  shadow-xl rounded-2xl buy-card overflow-hidden">
        <h3 className="absolute top-5 left-6 text-lg font-bold">
          My Buy Tirp Card
        </h3>
        <div className="w-full mx-auto">
          <Link to={`/product/${item?.products[0]?._id}`}>
            <div className="w-102.5 h-56 overflow-hidden rounded-xl mb-2 shadow-xl">
              <img
                className="size-full object-cover"
                src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${item?.products[0]?.image?.name}`}
                alt=""
              />
            </div>
          </Link>
        </div>
        <div className="border-2 w-[320px] h-full rounded-tr-[44px] absolute top-[312px] left-0 bg-light-gray z-20 shadow-top">
          <div className="flex flex-col justify-start  pt-4 px-6 mb-4">
            <h4 className="mb-1 text-lg  font-semibold  line-clamp-1">
              {item?.products[0]?.name}
            </h4>
          </div>
        </div>
        <div className="absolute w-[384px] h-full top-[364px] left-0 bg-light-gray z-30 ">
          <div className="flex text-sm  justify-center items-center gap-6 mt-6 mx-2">
            <p className=" font-semibold">
              {item?.products[0]?.extra?.date?.startDate} ~{' '}
              {item?.products[0]?.extra?.date?.endDate}
            </p>
            <div className="flex items-center gap-2">
              <span className=" bg-second-color rounded-md p-2 mr-2 ">
                구매완료
              </span>
              <p className="font-sm font-semibold">
                {item?.products[0]?.price} 원
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mb-4">
        <button
          className=" bottom-1 bg-main-color text-white w-36 px-4 py-2 rounded-lg ml-auto mr-[27.5px]"
          type="button"
          onClick={onClick}
        >
          여행장 리뷰 쓰기{' '}
        </button>
        {isClick && <ReviewItem key={item._id} item={item} />}
      </div>
    </div>
  );
}

export default ProductBuyListItem;
