import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

Review.propTypes = {
  seller_id: PropTypes.number,
};

function Review({ seller_id }) {
  console.log('sellerId=>', seller_id);
  const axios = useCustomAxios();
  const [review, setReview] = useState([]);

  const getReview = async () => {
    try {
      const res = await axios.get(`/replies/seller/${seller_id}`);
      // setReview[res?.data?.item];

      const flattenedReplies = res?.data?.item?.flatMap(item => item.replies);
      setReview(flattenedReplies);
      console.log('review array => ', flattenedReplies);
      // console.log('res?.data?.item', res?.data?.item);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getReview();
  }, []);

  return (
    <div>
      <h4 className="mb-3 ml-2 font-semibold">
        받은 동행 후기({review.length})
      </h4>
      <ul className="pl-3">
        {review.map(item => {
          return (
            <li className="border-[1px] rounded-lg mb-6 py-2" key={item._id}>
              <div className="flex justify-between mb-6 px-4 ">
                <p>{item.user_name}</p>
                <p className="text-xs text-gray-400 ">{item.createdAt}</p>
              </div>
              <div className="px-4 ">
                <p>{item.content}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Review;
