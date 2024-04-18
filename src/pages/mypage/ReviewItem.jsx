import useCustomAxios from '@hooks/useCustomAxios.mjs';
import PropTypes from 'prop-types';
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
  const { register, handleSubmit } = useForm();
  const axios = useCustomAxios();

  const onSubmit = async formData => {
    try {
      const orderId = item._id;
      const prodId = item.products[0]._id;
      const review = {
        order_id: orderId,
        product_id: prodId,
      };
      const newReview = {
        ...review,
        ...formData,
      };

      const res = await axios.post('/replies', newReview);
      console.log('후기 res =>', res);
      alert('후기 작성 완료하였습니다.');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea {...register('content')} />
        <button type="submit">작성하기</button>
      </form>
    </div>
  );
}

export default ReviewItem;
