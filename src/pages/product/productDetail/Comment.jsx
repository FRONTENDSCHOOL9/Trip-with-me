import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CommentNew from './CommentNew';
import { useEffect, useState } from 'react';
import useMemberState from '@zustand/memberState.mjs';
import CommentEdit from './CommentEdit';
import CommentDelete from './CommentDelete';
import usePageStore from '@zustand/pageName.mjs';

function Comment() {
  const page = 'Mypage';
  const axios = useCustomAxios();
  const { _id } = useParams();
  const { user } = useMemberState();

  const setPageName = usePageStore(state => state.setPageName);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  const navigate = useNavigate();

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

  useEffect(() => {
    if (user) {
      setPageName(page);
    } else {
      noUser();
    }
  }, []);

  function noUser() {
    alert('로그인 후 이용 가능합니다.');
    navigate('/users/login');
  }

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

  const list = comments?.map(item => {
    const isCommentOwner = item.user?._id === user?._id;
    return (
      <div className="flex mb-4" key={item?._id}>
        <div className="flex flex-col justify-center">
          <Link to={`/mypage/${item?.user?._id}`}>
            <img
              className="w-14 h-14 border-2 rounded-full"
              src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${user?.profile}`}
              alt=""
            />
          </Link>
          <p className="text-center text-gray-500 text-sm mt-1">
            {item?.user?.name}
          </p>
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
          <div className="flex justify-center items-center mb-3">
            <p className="w-[226px] ml-4 ">{item?.content}</p>
            {isCommentOwner && (
              <>
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
              </>
            )}
          </div>
        )}
      </div>
    );
  });

  return (
    <div>
      <CommentNew refetch={refetch} />
      <div className="flex mx-4 text-sm mb-4 pt-4">
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
