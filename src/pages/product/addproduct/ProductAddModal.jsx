import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ProductAddModal({ productInfo }) {
  const navigate = useNavigate();
  const axios = useCustomAxios();

  const handleSubmit = async () => {
    try {
      console.log('product=>', productInfo);
      const res = await axios.post('/seller/products', productInfo);
      console.log('res=>', res);

      if (res.data && res.data.item._id) {
        navigate(`/product/${res.data.item._id}`);
      } else {
        console.error('Product ID not returned');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-4/5 border-4 rounded-3xl">
        <button className="m-4 ml-auto">
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
          className="px-6 py-4 mb-12 text-xl font-medium text-white rounded-full bg-main-color"
        >
          게시글 확인
        </button>
      </div>
    </div>
  );
}

export default ProductAddModal;
