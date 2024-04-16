import { useNavigate, useLocation } from 'react-router-dom';
import { useProductInfostore } from '@zustand/productInfo.mjs';
import { useState } from 'react';

function ProductImage() {
  const navigate = useNavigate();
  const { setProductInfo } = useProductInfostore();

  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadPrompt, setShowUploadPrompt] = useState(false);

  const handleFileChange = event => {
    setSelectedFile(URL.createObjectURL(event.target.files[0])); //로컬로 이미지 미리보기
    setShowUploadPrompt(false);
  };

  const onSubmit = event => {
    event.preventDefault();
    if (selectedFile) {
      setProductInfo({
        mainImages: [selectedFile],
      });
      navigate('/product/add/name');
    } else {
      setShowUploadPrompt(true);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={onSubmit}
      >
        <p className="text-2xl font-notosans font-semibold text-main-color my-20">
          여행 관련 이미지를 추가해주세요.
        </p>
        <label htmlFor="mainImages" className="relative inline-block">
          <div className="relative w-80 h-72 bg-light-gray border-mid-gray border-2 rounded-lg">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={selectedFile}
              alt=""
            />
            {!selectedFile && (
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/src/assets/icons/icon-image.png" alt="" />
              </div>
            )}
          </div>
        </label>
        <input
          className="hidden"
          type="file"
          accept="image/*"
          id="mainImages"
          onChange={handleFileChange}
        />
        {showUploadPrompt && (
          <p className="text-warning-color font-notosans font-medium text-sm">
            이미지를 업로드해주세요.
          </p>
        )}
        <div className="flex w-96 mt-56 justify-between items-center">
          <p className="ml-44 text-xl font-medium"> 1 / 7</p>
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

export default ProductImage;
