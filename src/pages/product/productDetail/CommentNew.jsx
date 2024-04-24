import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

CommentNew.propTypes = {
  commentId: PropTypes.string,
};

function CommentNew({ refetch }) {
  const axios = useCustomAxios();
  const { _id } = useParams();
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const handleContentChange = e => {
    const value = e.target.value;
    setContent(value);
    if (!value.trim()) {
      setErrorMessage('내용을 입력하세요');
    } else if (value.trim().length < 2) {
      setErrorMessage('2글자 이상 입력하세요');
    } else {
      setErrorMessage('');
    }
  };

  const onSubmit = async formData => {
    if (!isValid) {
      setErrorMessage('내용을 입력하세요');
      return;
    }
    try {
      formData.type = 'comment';
      formData.product_id = +_id;
      const res = await axios.post('/posts', formData);
      setContent('');
      reset();
      refetch();
      setErrorMessage('');
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleButtonClick = () => {
    if (!content.trim()) {
      setErrorMessage('내용을 입력해주세요');
    }
  };

  return (
    <div className="px-4 pt-4 rounded-lg">
      <h4 className="mb-4">Comment를 달아주세요</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-4">
          <textarea
            {...register('content', {
              minLength: {
                value: 2,
                message: '2글자 이상 입력하세요',
                resize: 'none',
              },
            })}
            value={content}
            onChange={handleContentChange}
            rows="3"
            cols="40"
            className="resize-none block w-full p-2 pr-16 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 "
            placeholder="내용을 입력하세요."
          />
          {(errorMessage || errors.content) && (
            <p className="mt-1 ml-2 text-sm text-red-500 bottom--10 absolute">
              {errorMessage || errors.content.message}
            </p>
          )}
          <button
            className="absolute z-10 py-4 bottom-1 right-6"
            type="submit"
            onClick={handleButtonClick}
          >
            <img
              className="w-10 h-10 "
              src="/assets/icons/icon-submit.png"
              alt=""
            />
            <i className="ir">댓글 등록</i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentNew;
