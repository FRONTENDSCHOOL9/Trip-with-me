import { useProductInfostore } from '@zustand/productInfo.mjs';
import { useState } from 'react';

function ProductContent() {
  const { setProductInfo } = useProductInfostore();
  const [showUploadContent, setShowUploadPrompt] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const content = formData.get('content');

    if (!content.trim()) {
      setShowUploadPrompt(true);
    } else {
      setProductInfo({ content: content });
    }
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
          <p className="text-sm text-center font-notosans  text-main-color mt-4 mb-10">
            예시) 차량,숙박,제공등
          </p>
        </label>
        <textarea
          id="content"
          name="content" // name 속성 추가
          className="relative w-80 h-96 bg-light-gray  rounded-lg"
          placeholder="상세 정보를 입력해주세요"
        ></textarea>
        {showUploadContent && (
          <p className="text-warning-color font-notosans font-medium text-sm">
            여행 상세 정보를 입력해주세요.
          </p>
        )}
        <button type="submit">다음</button>
      </form>
    </div>
  );
}

export default ProductContent;
