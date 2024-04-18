import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ProductContent({ setProductInfo }) {
  const [showUploadContent, setShowUploadContent] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (content.trim()) {
      setShowUploadContent(false);
    }
  }, [content]);

  const handleContentChange = e => {
    setContent(e.target.value);
  };

  const navigate = useNavigate();
  const { step } = useParams();

  const handleSubmit = e => {
    e.preventDefault();
    if (!content.trim()) {
      setShowUploadContent(true);
      return;
    }
    navigate(`/product/add/${+step + 1}`);
    setProductInfo(prevInfo => ({ ...prevInfo, content: content }));
  };

  const handlePrevButton = e => {
    navigate(`/product/add/${+step - 1}`);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <label htmlFor="content">
          <p className="text-2xl font-notosans font-semibold text-main-color mt-20">
            여행 상세 정보를 입력해주세요
          </p>
          <p className="text-sm text-center font-notosans text-main-color mt-4 mb-10">
            예시) 차량,숙박,제공등
          </p>
        </label>
        <textarea
          id="content"
          name="content"
          className="relative w-80 h-96 bg-light-gray rounded-lg"
          placeholder="상세 정보를 입력해주세요"
          value={content}
          onChange={handleContentChange}
        ></textarea>
        {showUploadContent && (
          <p className="text-warning-color font-notosans font-medium text-sm">
            여행 상세 정보를 입력해주세요.
          </p>
        )}
        <div className="flex w-96 mt-20 justify-between items-center">
          <button
            type="button"
            onClick={handlePrevButton}
            className="bg-main-color px-10 py-3 rounded-full text-xl font-medium text-white"
          >
            이전
          </button>
          <p className="text-xl font-medium"> 7 / 7</p>
          <button
            type="submit"
            className="bg-main-color px-10 py-3 rounded-full text-xl font-medium text-white"
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductContent;
