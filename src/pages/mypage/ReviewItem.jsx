import useCustomAxios from '@hooks/useCustomAxios.mjs';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// {
//   "order_id": 1,
//   "product_id": 2, -> 상품 번호
//   "rating": 3,
//   "content": "친절하셨어요",
// }
//시나리오 : 게시물 작성자 ID 와 후기 order_id가 같은 경우에만 해당 후기 불러오기

ReviewItem.propTypes = {
  item: PropTypes.object,
};

function ReviewItem({ item }) {
  console.log('item => ', item);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axios = useCustomAxios();
  const [rating, setRating] = useState(0);

  const onSubmit = async formData => {
    try {
      const orderId = item._id;
      const prodId = item.products[0]._id;
      const review = {
        order_id: orderId,
        product_id: prodId,
        rating: rating,
      };
      const newReview = {
        ...review,
        ...formData,
      };

      const res = await axios.post('/replies', newReview);
      console.log('후기 res =>', res);

      console.log('후기 별점 포함 객체', newReview);
      alert('후기 작성 완료하였습니다.');
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleStar = e => {
    const keyElement = e.currentTarget.getAttribute('data-num');
    console.log('key', keyElement);
    setRating(parseInt(keyElement));
  };

  return (
    <div>
      <form className="flex flex-col mt-1" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          {[1, 2, 3, 4, 5].map(num => (
            <button
              key={num}
              className={`bg-[url('/src/assets/icons/icon-star${num <= rating ? '-full' : ''}.svg')] w-6 h-6 mr-2 mb-1`}
              type="button"
              data-num={num}
              onClick={handleStar}
            ></button>
          ))}
        </div>
        <div className="h-20 order border border-gray-300 flex">
          <textarea
            className="w-4/5 outline-none resize-none"
            {...register('content', { required: '후기를 입력하세요.' })}
          />

          <button
            className="w-1/5 h-8 mt-auto mx-1 mb-1 bg-gray-200 rounded-lg"
            type="submit"
          >
            작성
          </button>
        </div>
        {errors.content && errors.content.message}
      </form>
    </div>
  );
}

export default ReviewItem;
