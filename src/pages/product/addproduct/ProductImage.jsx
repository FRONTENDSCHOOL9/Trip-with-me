import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

ProductImage.propTypes = {
  productInfo: PropTypes.object,
  setProductInfo: PropTypes.func,
};

function ProductImage({ productInfo, setProductInfo }) {
  const navigate = useNavigate();
  const { step } = useParams();
  const axios = useCustomAxios();

  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadPrompt, setShowUploadPrompt] = useState(false);
  const [fileNamed, setFileNamed] = useState();

  const handleFileChange = e => {
    console.log('파일출력', e.target.files);
    setSelectedFile(URL.createObjectURL(e.target.files[0]));
    setShowUploadPrompt(false);
    setFileNamed(e.target.files[0]);
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      if (selectedFile) {
        const imageFormData = new FormData();
        imageFormData.append('attach', fileNamed);
        console.log('imageFormData', imageFormData);

        const fileRes = await axios('/files', {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: imageFormData,
        });
        console.log('fileRes', fileRes);

        setProductInfo(prevInfo => ({
          ...prevInfo,
          mainImages: {
            name: fileRes.data.item[0].name,
          },
        }));
        navigate(`/product/add/${+step + 1}`);
      } else {
        setShowUploadPrompt(true);
      }
    } catch (error) {
      console.log(error.message);
    }
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
