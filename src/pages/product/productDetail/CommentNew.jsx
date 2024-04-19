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
    <div className="p-4 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <textarea
            {...register('content', {
              minLength: {
                value: 2,
                message: '2글자 이상 입력하세요',
              },
            })}
            value={content}
            onChange={handleContentChange}
            rows="3"
            cols="40"
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
          />
          {(errorMessage || errors.content) && (
            <p className="ml-2 mt-1 text-sm text-red-500">
              {errorMessage || errors.content.message}
            </p>
          )}
        </div>
        <button type="submit" onClick={handleButtonClick}>
          댓글 등록
        </button>
      </form>
    </div>
  );
}

export default CommentNew;
