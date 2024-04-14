import useCustomAxios from '@hooks/useCustomAxios.mjs';
import React from 'react';

// {
// 게시물 정보 조회 시 :{{url}}/products/1(프로덕트ID)
// 리뷰 조회 시 : {{url}}/replies/products/2 (여행장ID)
//   "order_id": 1,
//   "product_id": 2, -> 여행장 userID
//   "rating": 3,
//   "content": "친절하셨어요",
// }
//시나리오 : 게시물 작성자 ID 와 후기 order_id가 같은 경우에만 해당 후기 불러오기

function Review() {
  const axios = useCustomAxios();
  // orderid를 가져와서 게시물에서 sellerid 가져오고 그에 맞는 후기값 가져오기

  return <div>Review</div>;
}

export default Review;
