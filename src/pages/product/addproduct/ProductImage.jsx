import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    // 페이지 이동 시 sessionStorage에서 선택한 파일 데이터를 가져와서 설정합니다.
    const storedFile = sessionStorage.getItem('selectedFile');
    if (storedFile) {
      setSelectedFile(storedFile);
    }
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행합니다.

  function handlePageUnload() {
    // sessionStorage에 저장된 데이터 삭제
    sessionStorage.removeItem('selectedFile');
  }

  const convertImageToWebP = file => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);

        canvas.toBlob(blob => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Image conversion failed'));
          }
        }, 'image/webp');
      };
      img.onerror = reject;
    });
  };

  window.addEventListener('beforeunload', handlePageUnload);

  const handleFileChange = async e => {
    // 선택한 파일 데이터를 sessionStorage에 저장합니다.
    console.log('file=>', e.target.files[0]);
    const file = e.target.files[0];
    const webpFile = await convertImageToWebP(file);
    console.log('webpfile', webpFile);
    const imgUrl = URL.createObjectURL(webpFile);
    console.log('webpfile url', imgUrl);
    // console.log(imgUrl);/
    // sessionStorage.setItem('selectedFile', URL.createObjectURL(file));
    // setSelectedFile(URL.createObjectURL(file));
    // console.log('pr-imgview');
    setSelectedFile(imgUrl);
    setFileNamed(webpFile);
    setShowUploadPrompt(false);
  };
  // console.log(productInfo);

  const onSubmit = async e => {
    e.preventDefault();
    try {
      if (selectedFile) {
        const imageFormData = new FormData();
        imageFormData.append('attach', fileNamed);
        // console.log('imageFormData', imageFormData);
        console.log('selectedFile 안쪽 실행');

        const fileRes = await axios('/files', {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: imageFormData,
        });

        const fileName = fileRes.data.item[0]?.name || '';

        setProductInfo(prevInfo => ({
          ...prevInfo,
          mainImages: [{ name: fileName }], // 새 이미지로 덮어쓰기
          imageView: selectedFile,
          fileName: fileNamed,
        }));
        navigate(`/product/add/${+step + 1}`);
      } else if (!selectedFile && productInfo.imageView) {
        // const imageFormData = new FormData();
        // imageFormData.append('attach', productInfo.fileNamed);
        // // console.log('imageFormData', imageFormData);
        // console.log('elseif 안쪽 실행');

        // const fileRes = await axios('/files', {
        //   method: 'post',
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        //   data: imageFormData,
        // });

        // const fileName = fileRes.data.item[0]?.name || '';

        // setProductInfo(prevInfo => ({
        //   ...prevInfo,
        //   mainImages: [{ name: fileName }], // 새 이미지로 덮어쓰기
        // }));
        navigate(`/product/add/${+step + 1}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col items-center justify-cente "
        onSubmit={onSubmit}
      >
        <p className="my-12 text-2xl font-semibold text-main-color">
          여행 관련 이미지를 추가해주세요.
        </p>
        <label
          htmlFor="mainImages"
          className="relative inline-block shadow-lg "
        >
          <div className="relative border-2 rounded-lg w-80 h-72 bg-light-gray border-mid-gray">
            <img
              className="object-cover w-full h-full rounded-lg"
              src={
                !selectedFile && productInfo.imageView
                  ? productInfo.imageView
                  : selectedFile
              }
              alt=""
            />
            {!selectedFile && (
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/assets/icons/icon-image.png" alt="" />
              </div>
            )}
          </div>
        </label>
        <div className="relative flex items-center justify-center">
          <input
            className="hidden"
            type="file"
            accept="image/*"
            id="mainImages"
            onChange={handleFileChange}
          />
          {showUploadPrompt && (
            <p className="w-[152px] absolute text-sm font-medium text-warning-color font-notosans mt-8">
              이미지를 업로드해주세요.
            </p>
          )}
        </div>
        <div className="flex items-center justify-between mt-20 w-96">
          <p className="font-semibold text-m ml-44"> 1 / 7</p>
          <button
            type="submit"
            className="px-10 py-3 text-xl font-semibold text-white rounded-full bg-main-color"
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductImage;
