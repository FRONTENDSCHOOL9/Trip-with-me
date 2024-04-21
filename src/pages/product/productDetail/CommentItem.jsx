import { useEffect, useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';

import PropTypes from 'prop-types';

CommentItem.propTypes = {
  item: PropTypes.object.isRequired,
};

function CommentItem({ item }) {
  const [comments, setComments] = useState([]);
  const axios = useCustomAxios();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get('/posts?type=comment', {
        params: {
          type: 'comment',
        },
      });
      console.log('넹!', data);
    } catch (err) {
      console.log(err.message);
    }
  };

  // return (
  //   <div className="rounded-lg p-4 mb-4">
  //     {comments.map(comment => (
  //       <div key={comment.id} className="whitespace-pre-wrap text-sm">
  //         {comment.text}
  //       </div>
  //     ))}
  //   </div>
  // );
}

export default CommentItem;
