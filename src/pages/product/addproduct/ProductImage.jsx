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

  const navigate = useNavigate();
  const { step } = useParams();

  const handleImageChange = e => {
    e.preventDefault();
    if (selectedFile) {
      setProductInfo(prevInfo => ({ ...prevInfo, mainImages: [selectedFile] }));
      navigate(`/product/add/${+step + 1}`);
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
            type="submit"
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

// //서버로 전송 및 전역 상태 업데이트
// const onSubmit = async formData => {
//   try {
//     //파일 먼저 가져오기
//     if (selectedFile.length > 0) {
//       console.log('selectedFile =>', selectedFile);

//       const imageFormData = new FormData();
//       imageFormData.append('attach', selectedFile[0]);

//       // console.log('formData =>', formData);
//       console.log('imageFormData=>', imageFormData);
//       const fileRes = await axios('/files', {
//         method: 'post',
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         data: imageFormData,
//       });
//       formData.profileImage = fileRes.data.item[0].name;
//     } else if (selectedFile.length <= 0) {
//       formData.profileImage = propUser?.profile;
//     }

// 		console.log('현재 보내는 formData => ', formData);
//     const res = await axios.patch('/users/' + propUser._id, formData);
