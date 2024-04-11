<<<<<<< HEAD
function ProductImage() {
  return <div>ProductImage</div>;
=======
import { useProductInfostore } from '@zustand/productInfo.mjs';
import { useState } from 'react';

function ProductImage() {
  const { setProductInfo } = useProductInfostore();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = event => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };

  const onSubmit = event => {
    event.preventDefault();
    setProductInfo({
      mainImages: [selectedFile],
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="mainImages">여행 관련 이미지를 추가해주세요</label>
        <img
          className="w-72 h-48 bg-slate-200 "
          src={selectedFile}
          alt="대표 이미지"
        />
        <input
          type="file"
          accept="image/*"
          id="mainImages"
          onChange={handleFileChange}
        />
        <button type="submit">다음</button>
      </form>
    </div>
  );
>>>>>>> a838e2d (Feat: Image 업로드 기능테스트)
}

export default ProductImage;
