import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useNavigate } from 'react-router-dom';

function ProductAddModal({ productInfo }) {
  const navigate = useNavigate();
  const axios = useCustomAxios();

  const handleSubmit = async () => {
    try {
      console.log('product=>', productInfo);
      const res = await axios.post('/seller/products', productInfo);
      console.log('res=>', res);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className=" flex flex-col justify-center items-center w-4/5 border-4 rounded-3xl">
        <button className="ml-auto m-4">
          <i className="ir">닫기</i>
          <img src="/src/assets/icons/icon-close.png" alt="" />
        </button>
        <img
          className="mb-14"
          src="/src/assets/icons/icon-check-circle.png"
          alt=""
        />
        <p className="text-xl font-medium mb-14">등록 되었습니다.</p>
        <button
          onClick={handleSubmit}
          className="bg-main-color mb-12 px-6 py-4 rounded-full text-xl font-medium  text-white"
        >
          게시글 확인
        </button>
      </div>
    </div>
  );
}

export default ProductAddModal;
