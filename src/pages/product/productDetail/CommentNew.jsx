import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

CommentNew.propTypes = {
  commentId: PropTypes.string,
};

function CommentNew({refetch}) {
  const axios = useCustomAxios();
  const { _id } = useParams();

  useEffect(()=>{

  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const onSubmit = async (formData) => {
    try{
      formData.type = 'comment';
      formData.product_id = +_id;
      const res = await axios.post('/posts', formData);
      const txt = document.querySelector('textarea');
      txt.value = '';
      console.log('res', res);
      reset();
      refetch();
    }
    catch(err){
      console.log(err.message);
    }

  };

  return (
    <div className="p-4 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <textarea
            {...register('content', {
              required: '내용을 입력하세요',
              minLength: {
                value: 2,
                message: '2글자 이상 입력하세요',
              },
            })}
            rows="3"
            cols="40"
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
          />
          {errors.comment && (
            <p className="ml-2 mt-1 text-sm text-red-500">
              {errors.comment.message}
            </p>
          )}
        </div>
        <button type="submit">댓글 등록</button>
      </form>
    </div>
  );
}

export default CommentNew;
