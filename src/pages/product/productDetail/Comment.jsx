// Comment 컴포넌트
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CommentItem from './CommentItem';
import CommentNew from './CommentNew';

function Comment() {
  const axios = useCustomAxios();
  const { _id } = useParams();

  const { data } = useQuery({
    queryKey: ['comments', _id],
    queryFn: () => axios.get(`/products/${_id}`),
  });

  console.log('data', data);

  const list =
    data && Array.isArray(data)
      ? data.map(item => <CommentItem key={item._id} item={item} />)
      : null;

  console.log('리스트', list);
  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2"> 댓글{list?.length || 0}</h4>
      {list}
      <CommentNew />
    </section>
  );
}

export default Comment;
