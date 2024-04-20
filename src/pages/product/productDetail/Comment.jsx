import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CommentNew from './CommentNew';
import { useEffect, useState } from 'react';
import useMemberState from '@zustand/memberState.mjs';
import CommentEdit from './CommentEdit';
import CommentDelete from './CommentDelete';

function Comment() {
  const axios = useCustomAxios();
  const { _id } = useParams();
  const { user, setUser } = useMemberState();
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['comments', _id],
    queryFn: async () => {
      const res = await axios.get('/posts', {
        params: {
          type: 'comment',
          custom: `{ "product_id" : ${_id}}`,
        },
      });
      return res;
    },
    select: res => res.data,
  });

  useEffect(() => {
    if (data) {
      setComments(data.item);
    }
  }, [data]);

  const handleEditComment = async (commentId, editedText) => {
    try {
      await axios.patch(`/posts/${commentId}`, { content: editedText });
      setComments(
        comments.map(comment =>
          comment._id === commentId
            ? { ...comment, content: editedText }
            : comment,
        ),
      );
      setEditingCommentId(null);
      setEditCommentText('');
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async commentId => {
    try {
      await axios.delete(`/posts/${commentId}`);
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.log(error.message);
    }
  };

  let list = comments?.map(item => {
    return (
      <div className="flex mb-4" key={item?._id}>
        <div>
          <img
            className=" w-14 h-14 border-2 rounded-full"
            src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${user?.profile}`}
            alt=""
          />
        </div>

        {editingCommentId === item._id ? (
          <CommentEdit
            comment={item}
            onSave={handleEditComment}
            onCancel={() => {
              setEditingCommentId(null);
              setEditCommentText('');
            }}
          />
        ) : (
          <div className="flex justify-center items-center">
            <p className="w-[226px] ml-4">{item?.content}</p>
            <button
              className="px-2 py-1 mr-1 text-main-color border-[1px] rounded-md"
              onClick={() => setEditingCommentId(item._id)}
            >
              수정
            </button>
            <CommentDelete
              commentId={item._id}
              onDelete={handleDeleteComment}
            />
          </div>
        )}
      </div>
    );
  });

  return (
    <div>
      <CommentNew refetch={refetch} />
      <div className="flex mx-4 text-sm mb-4">
        <h4 className="mr-1">Comment</h4>
        <p>
          <span>({comments?.length || 0})</span>
        </p>
      </div>
      {list}
    </div>
  );
}

export default Comment;
