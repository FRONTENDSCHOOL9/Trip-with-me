import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ProductContent({ productInfo, setProductInfo }) {
  const navigate = useNavigate();
  const { step } = useParams();

  const [showUploadContent, setShowUploadContent] = useState(false);
  const [content, setContent] = useState('');
  const axios = useCustomAxios();

  useEffect(() => {
    if (content.trim()) {
      setShowUploadContent(false);
    }
  }, [content]);

  const handleContentChange = e => {
    setContent(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!content.trim()) {
      setShowUploadContent(true);
      return;
    }
    try {
      axios.post('/seller/products');
    } catch (err) {}

    navigate(`/product/add/${+step + 1}`);
    setProductInfo(prevInfo => ({ ...prevInfo, content: content }));
    navigate(`/product/add/${+step + 1}`);
    console.log(productInfo);
  };

  const handlePrevButton = e => {
    e.preventDefault();
    navigate(`/product/add/${+step - 1}`);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <label htmlFor="content">
          <p className="mt-20 text-2xl font-semibold font-notosans text-main-color">
            여행 상세 정보를 입력해주세요
          </p>
          <p className="mt-4 mb-10 text-sm text-center font-notosans text-main-color">
            예시) 차량,숙박,제공등
          </p>
        </label>
        <textarea
          id="content"
          name="content"
          className="relative rounded-lg w-80 h-96 bg-light-gray"
          placeholder="상세 정보를 입력해주세요"
          value={content}
          onChange={handleContentChange}
        ></textarea>
        {showUploadContent && (
          <p className="text-sm font-medium text-warning-color font-notosans">
            여행 상세 정보를 입력해주세요.
          </p>
        )}
        <div className="flex items-center justify-between mt-20 w-96">
          <button
            type="button"
            onClick={handlePrevButton}
            className="px-10 py-3 text-xl font-medium text-white rounded-full bg-main-color"
          >
            이전
          </button>
          <p className="text-xl font-medium"> 7 / 7</p>
          <button
            type="submit"
            className="px-10 py-3 text-xl font-medium text-white rounded-full bg-main-color"
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductContent;
