import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

Review.propTypes = {
  seller_id : PropTypes.number
}

// {
// 게시물 정보 조회 시 :{{url}}/products/1(프로덕트ID)
// 리뷰 조회 시 : {{url}}/replies/products/2 (여행장ID)
//   "order_id": 1,
//   "product_id": 2, -> 여행장 userID
//   "rating": 3,
//   "content": "친절하셨어요",
// }

// {{url}}/replies/seller/2/
function Review({seller_id}) {
  console.log('sellerId=>', seller_id);
  const axios = useCustomAxios();
  const [review, setReview] = useState([]);

  const getReview = async() =>{
    try{
      const res = await axios.get(`/replies/seller/${seller_id}`);
      // setReview[res?.data?.item];

      const flattenedReplies = res?.data?.item?.flatMap(item => item.replies);
      setReview(flattenedReplies);
      console.log('review array => ', flattenedReplies);
      // console.log('res?.data?.item', res?.data?.item);
    }
    catch(err){
      console.log(err.message);
    }
  }

  useEffect(()=>{
    getReview();
  },[]);


  return (
    <div>
    <p className="font-semibold mb-3">받은 동행 후기({review.length})</p>
    <ul className="pl-3">
    {
      review.map((item)=>{
        return (<li className="mb-3" key={item._id}>
          <p>{item.user_name}</p>
          <p className="text-xs text-gray-400">{item.createdAt}</p>

          <p>{item.content}</p>
          </li>);
      })
    }
    </ul>
  </div>
  );
  

}

export default Review;
