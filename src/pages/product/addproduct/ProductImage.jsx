import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ProductImage({ setProductInfo }) {
  const navigate = useNavigate();
  const { step } = useParams();

  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadPrompt, setShowUploadPrompt] = useState(false);

  const handleFileChange = event => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
    setShowUploadPrompt(false);
  };

  const handleImageChange = e => {
    e.preventDefault();
    if (selectedFile) {
      setProductInfo(prevInfo => ({ ...prevInfo, mainImages: [selectedFile] }));
    } else {
      setShowUploadPrompt(true);
    }
    navigate(`/product/add/${+step + 1}`);
  };

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <div>
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={onSubmit}
      >
        <p className="my-20 text-2xl font-semibold font-notosans text-main-color">
          여행 관련 이미지를 추가해주세요.
        </p>
        <label htmlFor="mainImages" className="relative inline-block">
          <div className="relative border-2 rounded-lg w-80 h-72 bg-light-gray border-mid-gray">
            <img
              className="object-cover w-full h-full rounded-lg"
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
          <p className="text-sm font-medium text-warning-color font-notosans">
            이미지를 업로드해주세요.
          </p>
        )}
        <div className="flex items-center justify-between mt-56 w-96">
          <p className="text-xl font-medium ml-44"> 1 / 7</p>
          <button
            type="submit" // 폼 제출 버튼으로 변경
            onClick={handleImageChange}
            className="px-10 py-3 text-xl font-medium text-white rounded-full bg-main-color"
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductImage;
