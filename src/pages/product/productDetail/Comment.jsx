// Comment 컴포넌트
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CommentNew from './CommentNew';

function Comment() {
  const axios = useCustomAxios();
  const { _id } = useParams();

  const { data, refetch, error } = useQuery({
    queryKey : ['comments', _id],
    queryFn : async () => { 
      const res = await axios.get('/posts', {
      params :{
        type : "comment",
        custom : `{ "product_id" : ${_id}}`
      }
    }
  );
    return res;
  },
  select : res => res.data,
});


  let list = data?.item?.map((item)=>{
    return (
      <p key = {item?._id}>{item?.content}</p>
    )
  })

  return (
    <section className="mb-8">
      <h4>댓글</h4>
      <CommentNew refetch={refetch}/>
      {list}
    </section>
  );
}

export default Comment;
