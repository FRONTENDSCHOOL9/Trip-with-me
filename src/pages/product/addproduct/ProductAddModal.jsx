import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

ProductAddModal.propTypes = {
  productInfo: PropTypes.object,
};

function ProductAddModal({ productInfo }) {
  const navigate = useNavigate();
  const axios = useCustomAxios();
  const { step } = useParams();

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

  const handlePrevButton = e => {
    e.preventDefault();
    navigate(`/product/add/${+step - 1}`);
  };

  return (
    <div className="flex items-center justify-center h-full modal-box-screen">
      <div className="flex flex-col items-center justify-center w-4/5 bg-white border-4 rounded-3xl">
        <img
          className="my-14"
          src="/assets/icons/icon-smile-modal.svg"
          alt=""
        />
        <p className="text-xl font-medium mb-14">등록 하시겠습니까?</p>
        <div>
          <button
            onClick={handlePrevButton}
            className="py-3 mb-12 mr-10 text-xl font-semibold text-white rounded-full px-9 bg-main-color"
          >
            이전
          </button>
          <button
            onClick={handleSubmit}
            className="py-3 mb-12 text-xl font-semibold text-white rounded-full px-9 bg-main-color"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductAddModal;
