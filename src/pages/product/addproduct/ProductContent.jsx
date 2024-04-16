import { useState } from 'react';

const ProductContent = ({ setProductInfo }) => {
  const [showUploadContent, setShowUploadPrompt] = useState(false);

  const handleContentChange = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const content = formData.get('content');

    if (!content.trim()) {
      setShowUploadPrompt(true);
      return;
    }

    setProductInfo(prevInfo => ({ ...prevInfo, content: content }));
  };

  return (
    <div>
      <form
        onSubmit={handleContentChange}
        className="flex flex-col justify-center items-center"
      >
        <label htmlFor="content">
          <p className="text-2xl font-notosans font-semibold text-main-color mt-20">
            여행 상세 정보를 입력해주세요
          </p>
          <p className="text-sm text-center font-notosans  text-main-color mt-4 mb-10">
            예시) 차량,숙박,제공등
          </p>
        </label>
        <textarea
          id="content"
          name="content"
          className="relative w-80 h-96 bg-light-gray  rounded-lg"
          placeholder="상세 정보를 입력해주세요"
        ></textarea>
        {showUploadContent && (
          <p className="text-warning-color font-notosans font-medium text-sm">
            여행 상세 정보를 입력해주세요.
          </p>
        )}
        <div className="flex w-96 mt-20 justify-between items-center">
          <button
            type="button"
            className="bg-main-color px-10 py-3 rounded-full text-xl font-medium text-white"
          >
            이전
          </button>
          <p className="text-xl font-medium"> 3 / 7</p>
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
};

export default ProductContent;
