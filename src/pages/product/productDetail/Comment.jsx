// Comment 컴포넌트
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CommentItem from './CommentItem';
import CommentNew from './CommentNew';
import { useEffect } from 'react';

function Comment() {
  const axios = useCustomAxios();
  const { _id } = useParams();

  const { data, isLoading, refetch, error } = useQuery({
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


  // const getComment = async () =>{
  //   try{
  //     const res = await axios.get(`/posts`, {
  //       params :{
  //         type : "comment",
  //         custom : `{ "product_id" : ${_id}}`
  //       }
  //     })

  //     list = res?.data?.item?.map((item)=>{
  //       <p key={item._id}>{item.content}</p>
  //     });
  //   }
  //   catch(err){
  //     console.log(err.message);
  //   }
  // }

  // const { data } = useQuery({
  //   queryKey: ['comments', _id],
  //   queryFn: () => axios.get(`/products/${_id}`),
  // });

  //{{url}}/posts?type=comment&custom={"product_id":39}

  // const getComment = async () =>{
  //   try{
  //     const res = await axios.get(`/posts`, {
  //       params :{
  //         type : "comment",
  //         custom : `{ "product_id" : ${_id}}`
  //       }
  //     })
  //     setComments(res?.data);

  //     list = res?.data?.item?.map((item)=>{
  //       <p key={item._id}>{item.content}</p>
  //     });
  //   }
  //   catch(err){
  //     console.log(err.message);
  //   }
  // }
  

  let list = data?.item?.map((item)=>{
    return (
      <p key = {item?._id}>{item?.content}</p>
    )
  })

  useEffect(()=>{
    // getComment();
  },[])


  // const list = data?.map(item => <CommentItem key={item._id} item={item} />)

  return (
    <section className="mb-8">
      <h4>댓글</h4>
      <CommentNew refetch={refetch}/>
      {list}
      {/* <h4 className="mt-8 mb-4 ml-2"> 댓글{list?.length || 0}</h4> */}
      {/* {list} */}
    </section>
  );
}

export default Comment;
