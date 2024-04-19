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
      <div key={item?._id}>
        <img
          src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${user?.profile}`}
          alt=""
        />
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
          <>
            <p>{item?.content}</p>
            <button onClick={() => setEditingCommentId(item._id)}>수정</button>
            <CommentDelete
              commentId={item._id}
              onDelete={handleDeleteComment}
            />
          </>
        )}
      </div>
    );
  });

  return (
    <section className="mb-8">
      <h4>댓글</h4>

      <p className="mt-8 mb-4 ml-2">
        댓글 수 <span>{comments?.length || 0}</span>
      </p>
      <CommentNew refetch={refetch} />
      {list}
    </section>
  );
}

export default Comment;
